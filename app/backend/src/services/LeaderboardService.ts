/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';

import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

import ILeaderboard from '../Interfaces/ILeaderboard';

export default class LeaderboardService {
  public totalOfPoints = (a: ILeaderboard, b: ILeaderboard) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    return this.totalVictories(a, b);
  };

  private goalsBalance(a: ILeaderboard, b: ILeaderboard) {
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    return this.goalsFavor(a, b);
  }

  private goalsFavor(a: ILeaderboard, b: ILeaderboard) {
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return this.goalsOwn(a, b);
  }

  private goalsOwn(a: ILeaderboard, b: ILeaderboard) {
    if (a.goalsOwn > b.goalsOwn) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    return 0;
  }

  public countPoints(match: Match, team: Team) {
    let winner: string;

    if (match.homeTeamGoals > match.awayTeamGoals) winner = 'home';
    else if (match.homeTeamGoals === match.awayTeamGoals) winner = 'draw';
    else winner = 'away';

    let points = 0;

    switch (winner) {
      case 'draw': points = 1; break;
      case 'home': if (match.homeTeam === team.id) points = 3; break;
      case 'away': if (match.awayTeam === team.id) points = 3; break;
      default: points = 0; break;
    }

    return points;
  }

  private orderFinalists(leaderboard: ILeaderboard[]) {
    return leaderboard.sort(this.totalOfPoints);
  }

  public countGoals(match: Match, team: Team) {
    const goals = { goalsFavor: 0, goalsOwn: 0 };

    if (match.homeTeam === team.id) {
      goals.goalsFavor = match.homeTeamGoals;
      goals.goalsOwn = match.awayTeamGoals;
    } else {
      goals.goalsFavor = match.awayTeamGoals;
      goals.goalsOwn = match.homeTeamGoals;
    }

    return goals;
  }

  public totalVictories = (a: ILeaderboard, b: ILeaderboard) => {
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    return this.goalsBalance(a, b);
  };

  private createNewLeaderboard(team: string, totalGames: number) {
    return {
      name: team,
      totalPoints: 0,
      totalGames,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    } as ILeaderboard;
  }

  private calculeteFinalists(team: Team, matches: Match[]) {
    const leaderboard = this.createNewLeaderboard(team.teamName, matches.length);

    matches.forEach((match) => {
      const points = this.countPoints(match, team);
      const goals = this.countGoals(match, team);

      if (points === 3) leaderboard.totalVictories += 1;
      if (points === 1) leaderboard.totalDraws += 1;
      if (points === 0) leaderboard.totalLosses += 1;

      leaderboard.goalsFavor += goals.goalsFavor;
      leaderboard.goalsOwn += goals.goalsOwn;
      leaderboard.goalsBalance += (goals.goalsFavor - goals.goalsOwn);

      leaderboard.totalPoints += points;
    });

    return leaderboard;
  }

  private calculateEfficiency(leaderboard: ILeaderboard) {
    const efficiency = ((leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100);
    return Math.round(efficiency * 100) / 100;
  }

  public getAllFinalists = async () => {
    const allTeams = await Team.findAll();

    const response = await Promise.all(allTeams.map(async (team) => {
      const matches = await Match.findAll({
        where: {
          inProgress: false,
          [Op.or]: [{ homeTeam: team.id }],
        },
      });

      const finalists = this.calculeteFinalists(team, matches);
      finalists.efficiency = this.calculateEfficiency(finalists);

      return finalists;
    }));

    return this.orderFinalists(response);
  };
}
