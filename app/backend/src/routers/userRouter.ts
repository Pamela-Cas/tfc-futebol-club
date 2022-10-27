import { Router } from 'express';

import UserController from '../controllers/LoginController';
import UserService from '../services/LoginServices';

import jwtValidate from '../middleware/jwtValidate';
import loginValidation from '../middleware/loginValidation';

const userRouter = Router();

const userService = new UserService();

const userController = new UserController(userService);

userRouter.post('/', loginValidation, userController.userLogin);
userRouter.get('/validate', jwtValidate.validateToken);

export default userRouter;
