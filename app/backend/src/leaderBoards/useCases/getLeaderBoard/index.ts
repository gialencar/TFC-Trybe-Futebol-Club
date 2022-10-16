import LeaderBoardController from './LeaderBoardController';
import LeaderBoardUseCase from './LeaderBoardUseCase';

const leaderBoardUseCase = new LeaderBoardUseCase();

const leaderBoardController = new LeaderBoardController(leaderBoardUseCase);

export default leaderBoardController;
