import { Router } from 'express';
import awayLeaderBoardController from '../leaderBoards/useCases/getAwayLeaderboard';
import homeLeaderBoardController from '../leaderBoards/useCases/getHomeLeaderboard';
import leaderBoardController from '../leaderBoards/useCases/getLeaderBoard';

const leaderBoardRouter = Router();

leaderBoardRouter
  .get('/home', (req, res) => {
    homeLeaderBoardController.handle(req, res);
  })
  .get('/away', (req, res) => {
    awayLeaderBoardController.handle(req, res);
  })
  .get('/', (req, res) => {
    leaderBoardController.handle(req, res);
  });

export default leaderBoardRouter;
