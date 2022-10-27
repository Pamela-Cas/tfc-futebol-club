import { Router } from 'express';
import TeamService from '../services/teamService';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.getAllTeam);
teamRouter.get('/:id', teamController.getByID);

export default teamRouter;
