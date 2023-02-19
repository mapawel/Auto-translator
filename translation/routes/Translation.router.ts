import { Router, Request, Response, NextFunction } from 'express';
import { translationValidator } from '../validator/translation.validator';
import CacheMiddleware from '../../middlewares/Cache.middleware';

export class TranslationRouter {
  public static initTranslationRoutes(
    router: Router,
    controllerFn: (req: Request, res: Response, next: NextFunction) => {}
  ) {
    router.post(
      '/translation',
      translationValidator,
      CacheMiddleware.findInCache,
      controllerFn
    );
  }
}
