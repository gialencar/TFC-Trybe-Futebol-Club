import { readFileSync } from 'fs';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../../../database/models/User';

export default class ValidateUseCase {
  execute = async (token: string) => {
    const jwtSecret = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

    const decoded = <JwtPayload>verify(token, jwtSecret);

    const userExists = await User.findOne({ where: { email: decoded } });
    if (!userExists) return;

    return userExists.role;
  };
}
