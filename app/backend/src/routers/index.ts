import * as express from 'express';
import login from './userRouter';
import team from './teamRouter';
import match from './matchesRouter';
import leaderboard from './LeaderboardRouter';

const router = express.Router();

router.use('/login', login);
router.use('/teams', team);
router.use('/matches', match);
router.use('/leaderboard', leaderboard);
export default router;
