import Team from '../../../database/models/Team';
import ITeamDTO from '../../common/TeamDTO';

export default class GetTeamUseCase {
  constructor(private teamModel = Team) {}

  async execute(id: number): Promise<ITeamDTO> {
    const team = await this.teamModel.findByPk(id);

    return JSON.parse(JSON.stringify(team));
  }
}
