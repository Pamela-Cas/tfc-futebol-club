import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';
import IMatch from '../Interfaces/IMatch';

class MatchService {
  private matchServ: typeof Match;

  constructor() {
    this.matchServ = Match;
  }

  public getAll() {
    return this.matchServ.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        }],
    });
  }

  public getAllInProgress(inProgress: boolean) {
    return this.matchServ.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        }],
    });
  }

  public async createMatches(match: IMatch) {
    const teams = await this.matchServ.findAll({

      where: { id: [match.homeTeam, match.awayTeam] },
    });

    if (teams.length !== 2) {
      throw new Error('There is no team with such id!');
    }
    return this.matchServ.create(match);
  }
}

export default MatchService;
