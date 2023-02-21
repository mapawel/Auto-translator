import { Router, Request, Response, NextFunction } from 'express';
import { translationValidator } from '../validator/translation.validator';
import { TranslationService } from '../service/Translation-service';
import { CacheMiddleware } from '../../middlewares/Cache.middleware';
import { Cache } from 'cache/Cache';

export class TranslationRouter {
  cacheMiddleware: CacheMiddleware;

  constructor(
    private readonly router: Router,
    cache: Cache,
    private readonly translationService: TranslationService
  ) {
    this.cacheMiddleware = new CacheMiddleware(cache);
  }

  public initTranslationRoutes() {
    this.router.post(
      '/translation',
      translationValidator,
      this.cacheMiddleware.findInCache,
      (req: Request, res: Response, next: NextFunction) => {
        this.translationService.postTranslation(req, res, next);
      }
      // TODO zamienić powyższe controllerem uniwersalnym, w nim zrobić handowanie błędów a funkcję w serwisie gdzie nie ma handlowanie - tak samo jak w middleware
    );
  }
}
