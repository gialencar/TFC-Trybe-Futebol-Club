import Match from '../../../database/models/Match';

export default class CreateMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(match: Match) {
    const result = await this.matchModel.create(match);

    return JSON.parse(JSON.stringify(result));
  }
}
