import * as queryString from 'query-string';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';

export default class ListMatchesUseCase {
  constructor(private matchModel = Match) {}

  async execute(inProgress?: string) {
    let filter = {};

    if (inProgress != null) {
      filter = queryString.parse(`inProgress=${inProgress}`, {
        parseBooleans: true,
      });
    }

    const matches = await this.matchModel.findAll({
      where: filter, // empty object when func receives no param. effectively not filtering
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}
