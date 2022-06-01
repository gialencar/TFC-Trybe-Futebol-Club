import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import LoginUseCase from './LoginUseCase';

export default class LoginController implements IController {
  constructor(private loginUseCase: LoginUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const result = await this.loginUseCase.execute({ email, password });

    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    return res.status(200).json(result);
  };
}
