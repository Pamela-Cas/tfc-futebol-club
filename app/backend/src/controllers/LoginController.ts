import { Request, Response } from 'express';

import UserService from '../services/LoginServices';

export default class UserController {
  constructor(
    private service: UserService,
  ) {}

  public userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // console.log('email', email, 'password', password);

    // const dadosUser = { email, password };
    // const response = await this.userService.userLogin(dadosUser);

    // return res.status(200).json({ token: response });

    try {
      const token = await this.service.userLogin({ email, password });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };
}
