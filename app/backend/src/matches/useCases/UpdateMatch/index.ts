import UpdateMatchController from './UpdateMatchController';
import UpdateMatchUseCase from './UpdateMatchUseCase';

const updateMatchUseCase = new UpdateMatchUseCase();

const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export default updateMatchController;
