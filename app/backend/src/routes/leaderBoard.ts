import { Router } from 'express';
import homeLeaderBoardController from '../leaderBoards/useCases/getHomeLeaderboard';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => {
  homeLeaderBoardController.handle(req, res);
});

export default leaderBoardRouter;
