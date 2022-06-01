import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

const loginUseCase = new LoginUseCase();

const loginController = new LoginController(loginUseCase);

export default loginController;
