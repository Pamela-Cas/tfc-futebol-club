import * as JsonWebToken from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

import { IJWT } from '../Interfaces/IJWT';
import HttpException from './HTTP_EXCEPTION';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class createToken {
  constructor(private jwt?: SignOptions) {
    if (!this.jwt) {
      this.jwt = jwtConfig;
    }
  }

  public generateJWTToken(payload: IJWT) {
    return JsonWebToken.sign(payload, SECRET, this.jwt);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const response = await JsonWebToken.verify(token, SECRET, this.jwt);
      return response;
    } catch (e) {
      throw new HttpException(401, 'token inválido');
    }
  }
}

export default createToken;
