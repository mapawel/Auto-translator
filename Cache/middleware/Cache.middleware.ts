import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../../exceptions/Validator.exception';
import { Cache } from '../Cache';
import { TranslationText } from '../../translation/types/Translation-text.type';
import { CacheException } from '../exception/Cache.exception';

export class CacheMiddleware {
  private readonly cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }
  findInCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: TranslationText; target: string } =
        req.body;

      const foundInCache: TranslationText | undefined =
        await this.cache.readOne(target, text);
      if (foundInCache) return res.json(foundInCache);
      next();
    } catch (err: any) {
      next(new CacheException({ err }));
    }
  };
}
