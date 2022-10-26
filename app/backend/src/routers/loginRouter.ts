import { Router } from 'express';
import User from '../controllers/LoginController';

const loginRoute = Router();
const userRouter = new User();
loginRoute.post('/login', userRouter.login);

export default loginRoute;
