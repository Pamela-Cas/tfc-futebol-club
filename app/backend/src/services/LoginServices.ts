import * as bcrypt from 'bcryptjs';
import token from '../middleware/jwtValidate';
import IdadosUser from '../Interfaces/IdadosUser';

import User from '../database/models/UserModel';

export default class UserService {
  private userModel = User;

  public userLogin = async (dadosUser: IdadosUser): Promise<string> => {
    const { email, password } = dadosUser;

    const recebeUser = await this.userModel.findOne({
      // attributes: ['email', 'password'],
      where: { email },
    });

    if (!recebeUser) {
      throw new Error('401 | Incorrect email or password');
    }

    if (!bcrypt.compareSync(password, recebeUser?.password)) {
      throw new Error('401 | Incorrect email or password');
    }
    return token.generateToken({ email });
  };

  public getUser = async (email: string): Promise<string> => {
    const result = await this.userModel.findOne({
      attributes: ['role'],
      where: { email },
      raw: true,
    });

    if (!result) {
      throw new Error('User not found&404');
    }

    return result.role;
  };
}
