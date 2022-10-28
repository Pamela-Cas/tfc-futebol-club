/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express';
import UserService from '../services/LoginServices';

export default class UserController {
  constructor(
    private service: UserService,
  ) {}

  public userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const token = await this.service.userLogin({ email, password });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };

  public validateToken = async (req: Request, res:Response) => {
    const { JwtPayload } = req.body;
    console.log(JwtPayload);
    return res.status(200).json({ role: JwtPayload.payload.role });
  };
}
