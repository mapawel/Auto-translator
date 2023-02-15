import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/NotFound.exception';

class Middleware404 {
  public throw = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException({ method: req.method, url: req.url }));
  };
}

export default new Middleware404();
