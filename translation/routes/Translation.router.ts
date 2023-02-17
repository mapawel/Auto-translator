import { Router, Request, Response, NextFunction } from 'express';
import { translationValidator } from '../validator/translation.validator';
import translationController from '../controllers/translation.controller';
import CacheMiddleware from '../../middlewares/Cache.middleware';

export class TranslationRouter {
  constructor(private readonly router: Router) {}

  public initTranslationRoutes() {
    this.router.post(
      '/translation',
      translationValidator,
      CacheMiddleware.findInCache,
      (req: Request, res: Response, next: NextFunction) =>
        translationController.postTranslation(req, res, next)
    );
  }
}
