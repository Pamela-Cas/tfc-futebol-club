import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeadboardController from '../controllers/LeadboardController';

const leaderboardRouter = Router();
const leadboadServ = new LeaderboardService();
const leadboardController = new LeadboardController(leadboadServ);

leaderboardRouter.get('/home', leadboardController.getAllFinalists);

export default leaderboardRouter;
