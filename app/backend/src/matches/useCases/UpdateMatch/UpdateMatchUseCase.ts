import Match from '../../../database/models/Match';

type scoreboard = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default class UpdateMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(id: number, scoreboard?: scoreboard, finished?: boolean) {
    let updateValues = {};

    if (scoreboard != null) updateValues = { ...scoreboard };
    if (finished != null) {
      updateValues = { ...updateValues, inProgress: finished };
    }

    this.matchModel.update(updateValues, { where: { id } });
  }
}
