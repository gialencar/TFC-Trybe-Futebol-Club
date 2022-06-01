import ValidateController from './ValidateController';
import ValidateUseCase from './ValidateUseCase';

const validateUseCase = new ValidateUseCase();

const validateController = new ValidateController(validateUseCase);

export default validateController;
