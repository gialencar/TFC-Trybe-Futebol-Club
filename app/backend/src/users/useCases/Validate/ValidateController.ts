import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import ValidateUseCase from './ValidateUseCase';

export default class ValidateController implements IController {
  constructor(private validateUseCase: ValidateUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;

    if (!authorization) return res.send();

    const role = await this.validateUseCase.execute(authorization);

    console.log({ role });

    return res.status(200).send(role);
  };
}