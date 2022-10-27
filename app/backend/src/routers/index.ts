import * as express from 'express';
import login from './userRouter';
import team from './teamRouter';

const router = express.Router();

router.use('/login', login);
router.use('/teams', team);

export default router;
