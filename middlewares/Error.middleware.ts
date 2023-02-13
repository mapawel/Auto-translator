import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/Http.exception';

class ErrorMiddleware {
  public throw = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.warn('>>>>>>>>> ', error, ' <<<<<<<<<<<');

    return res
      .status(error.code || 500)
      .json(error.message || 'Ups! Something went wrong... Try again later.');
  };
}

export default new ErrorMiddleware();
