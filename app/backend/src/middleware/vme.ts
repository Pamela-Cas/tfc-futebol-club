import { Request, Response, NextFunction } from 'express';

const verifyErrorMiddleware = (err: Error, req: Request, res:Response, _next: NextFunction) => {
  if (err.message.includes('|')) {
    const [STATUS_HTTP, errorMessager] = err.message.split('|');
    return res.status(Number(STATUS_HTTP)).json({ message: errorMessager });
  }
  return res.status(500).json({ message: 'erro interno' });
};

export default verifyErrorMiddleware;
