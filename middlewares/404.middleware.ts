import { Request, Response, NextFunction } from 'express';
import { Exception404 } from '../exceptions/404.exception';

class Middleware404 {
  public throw = (req: Request, res: Response, next: NextFunction) => {
    next(new Exception404({ method: req.method, url: req.url }));
  };
}

export default new Middleware404();
