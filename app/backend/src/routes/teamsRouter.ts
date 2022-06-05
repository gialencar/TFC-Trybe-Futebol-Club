import { Router } from 'express';
import listTeamsController from '../teams/useCases/ListTeams';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => {
  listTeamsController.handle(req, res);
});

export default teamsRouter;
