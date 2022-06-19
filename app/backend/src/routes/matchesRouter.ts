import { Router } from 'express';
import createMatchCOntroller from '../matches/useCases/CreateMatch';
import listMatchesController from '../matches/useCases/ListMatches';

const matchesRouter = Router();

matchesRouter
  .get('/', (req, res) => {
    listMatchesController.handle(req, res);
  })
  .post('/', (req, res) => {
    createMatchCOntroller.handle(req, res);
  });

export default matchesRouter;
