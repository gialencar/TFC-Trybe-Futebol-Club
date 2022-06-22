import GetTeamController from './GetTeamController';
import GetTeamUseCase from './GetTeamUseCase';

export const getTeamUseCase = new GetTeamUseCase();
const getTeamController = new GetTeamController(getTeamUseCase);

export default getTeamController;
