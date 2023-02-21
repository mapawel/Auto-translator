import { Router } from 'express';
import { translationValidator } from '../validator/translation.validator';
import { TranslationController } from '../controllers/translation-controller';
import { CacheMiddleware } from '../../middlewares/Cache.middleware';

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
      this.translationController.postTranslation
    );
  }
}
