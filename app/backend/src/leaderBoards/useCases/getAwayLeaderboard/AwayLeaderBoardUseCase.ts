import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import sortLeaderBoard from '../../helpers/sortLeaderBoard';

export default class AwayLeaderBoardUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  async getMatches(teamId: number) {
    return this.matchModel.findAll({
      where: { awayTeam: teamId, inProgress: false },
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
      if (match.awayTeamGoals > match.homeTeamGoals) {
        matchesResults.totalPoints += 3;
        matchesResults.totalVictories += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        matchesResults.totalPoints += 1;
        matchesResults.totalDraws += 1;
      } else matchesResults.totalLosses += 1;
    });

    return matchesResults;
  }

  static countGoals(matches: Match[]) {
    const goals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };

    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      goals.goalsFavor += awayTeamGoals;
      goals.goalsOwn += homeTeamGoals;
    });

    goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;

    return goals;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2).replace('.00', '');
  }

  async generateTeamStats(teamId: number) {
    const matches = await this.getMatches(teamId);
    const matchesResults = AwayLeaderBoardUseCase.calculateMatchesResults(matches);
    const goals = AwayLeaderBoardUseCase.countGoals(matches);
    const efficiency = AwayLeaderBoardUseCase.calculateEfficiency(
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
