import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  // private service: TeamService;

  constructor(private service: TeamService) {
    this.getAllTeam = this.getAllTeam.bind(this);
    this.getByID = this.getByID.bind(this);
    // quando perde a conection com a classe service.
  }

  public async getAllTeam(req: Request, res: Response) {
    const searchTeam = await this.service.getAllTeams();
    return res.status(200).json(searchTeam);
  }

  public async getByID(req: Request<{ id: number, }>, res: Response) {
    const { id } = req.params;

    const searchIdteam = await this.service.getTeamById(id);
    return res.status(200).json(searchIdteam);
  }
}

export default TeamController;
