import { Router } from 'express';
import getTeamController from '../teams/useCases/GetTeam';
import listTeamsController from '../teams/useCases/ListTeams';

const teamsRouter = Router();

teamsRouter
  .get('/', (req, res) => {
    listTeamsController.handle(req, res);
  })
  .get('/:id', (req, res) => {
    getTeamController.handle(req, res);
  });

export default teamsRouter;
