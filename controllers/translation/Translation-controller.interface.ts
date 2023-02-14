import { Request, Response, NextFunction } from 'express';

export interface ITranslationController {
  translate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>>;
}
