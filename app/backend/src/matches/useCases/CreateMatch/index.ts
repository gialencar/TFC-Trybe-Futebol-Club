import CreateMatchController from './CreateMatchController';
import CreateMatchUseCase from './CreateMatchUseCase';

const createMacthUseCase = new CreateMatchUseCase();

const createMatchCOntroller = new CreateMatchController(createMacthUseCase);

export default createMatchCOntroller;
