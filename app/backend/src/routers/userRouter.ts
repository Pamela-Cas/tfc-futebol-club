import * as express from 'express';

import UserController from '../controllers/LoginController';

import jwtValidate from '../middleware/jwtValidate';
import loginValidation from '../middleware/loginValidation';
import UserService from '../services/LoginServices';

const userRouter = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.post('/', loginValidation, userController.userLogin);
userRouter.get('/validate', jwtValidate.validateToken, userController.validateToken);

export default userRouter;
