import FinishMatchController from './FinishMachController';
import FinishMatchUseCase from './FinishMachUseCase';

const finishMatchUseCase = new FinishMatchUseCase();

const finishMatchController = new FinishMatchController(finishMatchUseCase);

export default finishMatchController;
