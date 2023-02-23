import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { translationValidator } from '../validator/translation.validator';
import { TranslationController } from '../controller/translation.controller';
import { CacheMiddleware } from '../../cache/middleware/Cache.middleware';

export class TranslationRouter {
  constructor(
    private readonly router: Router,
    private readonly cacheMiddleware: CacheMiddleware,
    private readonly translationController: TranslationController
  ) {}

  public initTranslationRoutes() {
    this.router.post(
      '/translation',
      translationValidator,
      this.cacheMiddleware.findInCache,
      (req: Request, res: Response, next: NextFunction) => {
        this.translationController.postTranslation(req, res, next);
      }
    );
  }
}
