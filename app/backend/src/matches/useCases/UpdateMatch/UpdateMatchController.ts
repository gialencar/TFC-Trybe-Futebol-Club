import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import UpdateMatchUseCase from './UpdateMatchUseCase';

export default class UpdateMatchController implements IController {
  constructor(private updateMatchUseCase: UpdateMatchUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals, finished } = req.body;

    await this.updateMatchUseCase.execute(
      +id,
      { homeTeamGoals, awayTeamGoals },
      finished,
    );

    return res.status(200).json({ message: 'done' });
  }
}
