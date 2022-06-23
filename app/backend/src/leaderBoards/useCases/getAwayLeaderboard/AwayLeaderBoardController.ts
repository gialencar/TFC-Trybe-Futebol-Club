import { Request, Response } from 'express';
import IController from '../../../common/interfaces/IController';
import AwayLeaderBoardUseCase from './AwayLeaderBoardUseCase';

export default class AwayLeaderBoardController implements IController {
  constructor(private awayLeaderBoardUseCase: AwayLeaderBoardUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.awayLeaderBoardUseCase.execute();

    return res.status(200).json(leaderBoard);
  }
}
