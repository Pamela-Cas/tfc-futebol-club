import { Router } from 'express';
import loginRouter from './loginRouter';

const routes = Router();

routes.use(loginRouter);

export default routes;
