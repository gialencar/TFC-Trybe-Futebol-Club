import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import sortLeaderBoard from '../../helpers/sortLeaderBoard';

export default class HomeLeaderBoardUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  async getMatches(teamId: number) {
    return this.matchModel.findAll({
      where: { homeTeam: teamId, inProgress: false },
    });
  }

  static calculateMatchesResults(matches: Match[]) {
    const matchesResults = {
      totalPoints: 0,
      totalGames: matches.length,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        matchesResults.totalPoints += 3;
        matchesResults.totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        matchesResults.totalPoints += 1;
        matchesResults.totalDraws += 1;
      } else matchesResults.totalLosses += 1;
    });

    return matchesResults;
  }

  static countGoals(matches: Match[]) {
    const goals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };

    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      goals.goalsFavor += homeTeamGoals;
      goals.goalsOwn += awayTeamGoals;
    });

    goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;

    return goals;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2).replace('.00', '');
  }

  async generateTeamStats(teamId: number) {
    const matches = await this.getMatches(teamId);
    const matchesResults = HomeLeaderBoardUseCase.calculateMatchesResults(matches);
    const goals = HomeLeaderBoardUseCase.countGoals(matches);
    const efficiency = HomeLeaderBoardUseCase.calculateEfficiency(
      matchesResults.totalPoints,
      matchesResults.totalGames,
    );

    return { ...matchesResults, ...goals, efficiency };
  }

  async execute() {
    const teams = await this.teamModel.findAll();

    const leaderBoard = await Promise.all(
      teams.map(async ({ id, teamName: name }) => {
        const stats = await this.generateTeamStats(id);
        return { name, ...stats };
      }),
    );

    leaderBoard.sort(sortLeaderBoard);

    return leaderBoard;
  }
}

(async () => {
  const useCase = new HomeLeaderBoardUseCase();

  console.log(await useCase.execute());
})();
