import { Router } from 'express';
import MatchService from '../services/matchService';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);

export default matchRouter;
