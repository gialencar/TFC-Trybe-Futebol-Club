import { Router } from 'express';
import loginController from '../users/useCases/Login';

const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {
  loginController.handle(req, res);
});

export default loginRouter;
