import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import ListMatchesUseCase from './ListMatchesUseCase';

export default class ListMatchesController implements IController {
  constructor(private listMatchesUseCase: ListMatchesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const matches = await this.listMatchesUseCase.execute(inProgress as string);

    return res.status(200).json(matches);
  }
}
