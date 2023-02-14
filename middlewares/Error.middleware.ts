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
    console.error('>>>>>>>>> ', error, ' <<<<<<<<<<<');

    if (error instanceof ValidatorException)
      return res
        .status(error.code)
        .json({ message: error.message, errors: error.errorPayload });

    return res
      .status(error.code)
      .json(error.message);
  };
}

export default new ErrorMiddleware();
