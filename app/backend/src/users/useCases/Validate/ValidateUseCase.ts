import { readFileSync } from 'fs';
import { JwtPayload, verify } from 'jsonwebtoken';
import { resolve } from 'path';
import User from '../../../database/models/User';

export default class ValidateUseCase {
  execute = async (token: string) => {
    const jwtSecret = readFileSync(
      resolve(__dirname, '../../../../jwt.evaluation.key'),
      { encoding: 'utf-8' },
    );
    const decoded = <JwtPayload>verify(token, jwtSecret);

    const userExists = await User.findOne({
      where: { email: decoded },
    });
    if (!userExists) return;

    return userExists.role;
  };
}
