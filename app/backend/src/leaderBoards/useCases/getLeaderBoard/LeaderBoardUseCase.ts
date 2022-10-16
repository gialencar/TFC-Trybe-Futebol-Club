import { Op } from 'sequelize';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import sortLeaderBoard from '../../helpers/sortLeaderBoard';

export default class LeaderBoardUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  async getMatches(teamId: number) {
    const a = await this.matchModel.findAll({
      where: { [Op.or]: [{ homeTeam: teamId }, { awayTeam: teamId }], inProgress: false },
    });

    return a;
  }

  static getMatchPoints(match: Match, teamId: number) {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }
    if (match.homeTeamGoals > match.awayTeamGoals && match.homeTeam === teamId) {
      return 3;
    }
    if (match.homeTeamGoals < match.awayTeamGoals && match.awayTeam === teamId) {
      return 3;
    }
    return 0; // team não é home
  }

  static calculateMatchesResults(matches: Match[], teamId: number) {
    const matchesResults = {
      totalPoints: 0,
      totalGames: matches.length,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    matches.forEach((match) => {
      const points = this.getMatchPoints(match, teamId);
      matchesResults.totalPoints += points;
      if (points === 3) matchesResults.totalVictories += 1;
      if (points === 1) matchesResults.totalDraws += 1;
      if (points === 0) matchesResults.totalLosses += 1;
    });

    return matchesResults;
  }

  static countGoals(matches: Match[], teamId: number) {
    const goals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };

    matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam }) => {
      if (homeTeam === teamId) {
        goals.goalsFavor += homeTeamGoals;
        goals.goalsOwn += awayTeamGoals;
      } else {
        goals.goalsFavor += awayTeamGoals;
        goals.goalsOwn += homeTeamGoals;
      }
    });

    goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;

    return goals;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2).replace('.00', '');
  }

  async generateTeamStats(teamId: number) {
    const matches = await this.getMatches(teamId);

    const matchesResults = LeaderBoardUseCase.calculateMatchesResults(matches, teamId);
    const goals = LeaderBoardUseCase.countGoals(matches, teamId);
    const efficiency = LeaderBoardUseCase.calculateEfficiency(
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
