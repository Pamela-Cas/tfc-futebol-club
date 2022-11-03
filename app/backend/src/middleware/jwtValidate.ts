import * as JWT from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: JWT.Secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtValidate = {
  generateToken: (payload: JWT.JwtPayload) => {
    const token = JWT.sign({ payload }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },
  validateToken: (req: Request, res:Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('401|Token must be a valid token');
    try {
      const testToken = JWT.verify(authorization, JWT_SECRET);
      req.body.JwtPayload = testToken;
      next();
    } catch (error) {
      console.log(error);
      throw new Error('401|Token must be a valid token');
    }
  },
};

export default jwtValidate;
// Req X será necessário validar o token porém sem o conteúdo de token || ver método para excluir chave!
