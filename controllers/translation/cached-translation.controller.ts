import { NextFunction, Request, Response } from 'express';
import { TranslationControllerDecorator } from './Decorator/Translation-controller.decorator';
import translationController from './translation.controller';

class CachedTranslationController extends TranslationControllerDecorator {
  public translate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> => {
    console.log(' ----> ', 'decorated class inside');
    res.end()
  };
}

export default new CachedTranslationController(translationController);
