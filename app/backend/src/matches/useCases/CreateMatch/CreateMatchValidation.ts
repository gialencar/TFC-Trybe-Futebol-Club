import { NextFunction, Request, Response } from 'express';
import { getTeamUseCase } from '../../../teams/useCases/GetTeam';

export default class CreateMatchValidation {
  static async handle(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const homeTeamExists = await getTeamUseCase.execute(homeTeam);
    const awayTeamExists = await getTeamUseCase.execute(awayTeam);

    if (!(homeTeamExists && awayTeamExists)) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    next();
  }
}
