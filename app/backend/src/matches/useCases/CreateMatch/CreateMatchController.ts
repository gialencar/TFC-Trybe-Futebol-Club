import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import CreateMatchUseCase from './CreateMatchUseCase';

export default class CreateMatchController implements IController {
  constructor(private createMatchUseCase: CreateMatchUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const match = req.body;

    const result = await this.createMatchUseCase.execute(match);

    return res.status(201).json(result);
  }
}
