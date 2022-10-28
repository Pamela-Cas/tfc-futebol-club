import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

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
}

export default MatchService;
