import Match from '../../../database/models/Match';

export default class FinishMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(id: number) {
    const [result] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    console.log(result);

    return result;
  }
}
