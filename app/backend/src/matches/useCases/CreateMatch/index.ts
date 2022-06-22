import CreateMatchController from './CreateMatchController';
import CreateMatchUseCase from './CreateMatchUseCase';
import CreateMatchValidation from './CreateMatchValidation';

const createMatchUseCase = new CreateMatchUseCase();

const createMatchCOntroller = new CreateMatchController(createMatchUseCase);

export const createMatchValidation = CreateMatchValidation;

export default createMatchCOntroller;
