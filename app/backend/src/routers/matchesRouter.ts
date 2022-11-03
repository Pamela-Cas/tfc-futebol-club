import { Router } from 'express';
import MatchService from '../services/matchService';
import MatchController from '../controllers/MatchController';
import jwtValidate from '../middleware/jwtValidate';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);
matchRouter.post('/', jwtValidate.validateToken, matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.getByID);
export default matchRouter;
