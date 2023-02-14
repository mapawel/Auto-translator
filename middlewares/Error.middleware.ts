import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/Http.exception';
import { ValidatorException } from '../exceptions/Validator.exception';

class ErrorMiddleware {
  public throw = (
    error: HttpException | ValidatorException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.warn('>>>>>>>>> ', error, ' <<<<<<<<<<<');

    if (error instanceof ValidatorException)
      return res
        .status(error.code)
        .json({ message: error.message, errors: error.errors });

    return res
      .status(error.code || 500)
      .json(error.message || 'Ups! Something went wrong... Try again later.');
  };
}

export default new ErrorMiddleware();
