import ListMatchesController from './ListMatchesController';
import ListMatchesUseCase from './ListMatchesUseCase';

const listMatchesUseCase = new ListMatchesUseCase();

const listMatchesController = new ListMatchesController(listMatchesUseCase);

export default listMatchesController;
