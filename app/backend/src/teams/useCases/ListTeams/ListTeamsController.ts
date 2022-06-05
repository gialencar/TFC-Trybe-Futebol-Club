import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import ListTeamsUseCase from './ListTeamsUseCase';

export default class ListTemasController implements IController {
  constructor(private listTeamsUseCase: ListTeamsUseCase) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    const teams = await this.listTeamsUseCase.execute();

    return res.status(200).json(teams);
  }
}
