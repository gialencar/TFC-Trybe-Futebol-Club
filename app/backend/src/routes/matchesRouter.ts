import { Router } from 'express';
import listMatchesController from '../matches/useCases/ListMatches';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => {
  listMatchesController.handle(req, res);
});

export default matchesRouter;
