import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import GetTeamUseCase from './GetTeamUseCase';

export default class GetTeamController implements IController {
  constructor(private getTeamUseCase: GetTeamUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.getTeamUseCase.execute(+id);

    if (!team) {
      return res.status(404).send();
    }

    return res.status(200).json(team);
  }
}
