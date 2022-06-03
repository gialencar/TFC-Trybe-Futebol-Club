import * as bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { resolve } from 'path';
import User from '../../../database/models/User';
import { ILoginRequestDTO, ILoginResponseDTO } from './LoginDTO';

export default class LoginUseCase {
  execute = async (
    data: ILoginRequestDTO,
  ): Promise<ILoginResponseDTO | undefined> => {
    const userExists = await User.findOne({
      where: { email: data.email },
    });
    if (!userExists) return;

    const { id, username, role, email, password: passwordHash } = userExists;

    const passwordMatches = bcrypt.compareSync(data.password, passwordHash);
    if (!passwordMatches) return;

    const jwtSecret = readFileSync(
      resolve(__dirname, '../../../../jwt.evaluation.key'),
      { encoding: 'utf-8' },
    );

    const token = sign(email, jwtSecret);

    return { user: { id, username, role, email }, token };
  };
}
