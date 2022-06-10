import { Router } from 'express';
import loginController from '../users/useCases/Login';
import validateController from '../users/useCases/Validate';

const loginRouter = Router();

loginRouter
  .post('/', (req, res) => {
    loginController.handle(req, res);
  })
  .get('/validate', (req, res) => {
    validateController.handle(req, res);
  });

export default loginRouter;
