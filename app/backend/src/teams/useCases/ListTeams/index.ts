import ListTemasController from './ListTeamsController';
import ListTeamsUseCase from './ListTeamsUseCase';

const listTeamsUseCase = new ListTeamsUseCase();
const listTeamsController = new ListTemasController(listTeamsUseCase);

export default listTeamsController;
