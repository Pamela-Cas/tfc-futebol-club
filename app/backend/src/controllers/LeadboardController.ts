import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private LeadServ: LeaderboardService) {
    this.LeadServ = new LeaderboardService();
    this.getAllFinalists = this.getAllFinalists.bind(this);
  }

  public async getAllFinalists(_req: Request, res: Response) {
    const response = await this.LeadServ.getAllFinalists();

    return res.status(200).json(response);
  }
}

export default LeaderboardController;
