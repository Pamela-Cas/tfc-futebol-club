import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
//   ;
  constructor(private matchService: MatchService) {
    this.getAll = this.getAll.bind(this);
  }

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    res.status(200).json(matches);
  };
}

export default MatchController;
