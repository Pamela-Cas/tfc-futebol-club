import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private matchService: MatchService) {
    this.getAll = this.getAll.bind(this);
  }

  public getAll = async (req: Request, res: Response) => {
    let matches;
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      matches = await this.matchService.getAllInProgress(true);
    }
    if (inProgress === 'false') {
      matches = await this.matchService.getAllInProgress(false);
    }
    if (!inProgress) {
      matches = await this.matchService.getAll();
    }
    res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    try {
      const matches = await this.matchService.createMatches({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true });
      res.status(201).json(matches);
    } catch (err) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  };

  public getByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const searchByID = await this.matchService.getByIDServ(+id);
    res.status(200).json(searchByID);
  };

  public upDate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatchId(parseInt(id, 10), homeTeamGoals, awayTeamGoals);
    return res.status(200).json('Sucesso');
  };
}
export default MatchController;
