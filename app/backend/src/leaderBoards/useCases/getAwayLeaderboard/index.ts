import AwayLeaderBoardController from './AwayLeaderBoardController';
import AwayLeaderBoardUseCase from './AwayLeaderBoardUseCase';

const awayLeaderBoardUseCase = new AwayLeaderBoardUseCase();

const awayLeaderBoardController = new AwayLeaderBoardController(awayLeaderBoardUseCase);

export default awayLeaderBoardController;
