import Team from '../../../database/models/Team';
import ITeamDTO from '../../common/TeamDTO';

export default class ListTeamsUseCase {
  constructor(private teamModel = Team) {}

  async execute(): Promise<ITeamDTO[]> {
    const teams = await this.teamModel.findAll();

    return JSON.parse(JSON.stringify(teams));
  }
}
