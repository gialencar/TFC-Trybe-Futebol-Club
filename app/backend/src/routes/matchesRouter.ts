import { Router } from 'express';
import createMatchCOntroller from '../matches/useCases/CreateMatch';
import finishMatchController from '../matches/useCases/FinishMatch';
import listMatchesController from '../matches/useCases/ListMatches';

const matchesRouter = Router();

matchesRouter
  .get('/', (req, res) => {
    listMatchesController.handle(req, res);
  })
  .post('/', (req, res) => {
    createMatchCOntroller.handle(req, res);
  })
  .patch('/:id/finish', (req, res) => {
    finishMatchController.handle(req, res);
  });

export default matchesRouter;
