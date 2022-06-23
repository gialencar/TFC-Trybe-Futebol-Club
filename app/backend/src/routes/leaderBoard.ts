import { Router } from 'express';
import awayLeaderBoardController from '../leaderBoards/useCases/getAwayLeaderboard';
import homeLeaderBoardController from '../leaderBoards/useCases/getHomeLeaderboard';

const leaderBoardRouter = Router();

leaderBoardRouter
  .get('/home', (req, res) => {
    homeLeaderBoardController.handle(req, res);
  })
  .get('/away', (req, res) => {
    awayLeaderBoardController.handle(req, res);
  });

export default leaderBoardRouter;
