import Team from '../database/models/TeamModel';

class TeamService {
  private team: typeof Team;

  constructor() {
    this.team = Team;
  }

  public getAllTeams() {
    return this.team.findAll();
  }

  public getTeamById(id: number) {
    return this.team.findByPk(id);
  }
}

export default TeamService;
