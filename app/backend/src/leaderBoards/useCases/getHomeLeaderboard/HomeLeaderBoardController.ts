import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import HomeLeaderBoardUseCase from './HomeLeaderBoardUseCase';

export default class HomeLeaderBoardController implements IController {
  constructor(private homeLeaderBoardUseCase: HomeLeaderBoardUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.homeLeaderBoardUseCase.execute();

    return res.status(200).json(leaderBoard);
  }
}
