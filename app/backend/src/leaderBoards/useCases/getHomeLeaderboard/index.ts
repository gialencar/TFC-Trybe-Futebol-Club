import HomeLeaderBoardController from './HomeLeaderBoardController';
import HomeLeaderBoardUseCase from './HomeLeaderBoardUseCase';

const homeLeaderBoardUseCase = new HomeLeaderBoardUseCase();

const homeLeaderBoardController = new HomeLeaderBoardController(
  homeLeaderBoardUseCase,
);

export default homeLeaderBoardController;
