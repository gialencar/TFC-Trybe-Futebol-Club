import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import LeaderBoardUseCase from './LeaderBoardUseCase';

export default class LeaderBoardController implements IController {
  constructor(private leaderBoardUseCase: LeaderBoardUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.leaderBoardUseCase.execute();

    return res.status(200).json(leaderBoard);
  }
}
