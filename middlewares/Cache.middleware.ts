import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../exceptions/Validator.exception';
import cache from '../cache/Cache';
import { Text } from '../translation/types/Translation-text.type';

class CacheMiddleware {
  constructor() {}
  findInCache = async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty())
      return next(new ValidatorException({ errors: errors.array() }));

    const { text, target }: { text: Text; target: string } = req.body;

    const foundInCache: Text | undefined = await cache.findInCache(
      target,
      text
    );
    if (foundInCache) return res.json(foundInCache);
    next();
  };
}

export default new CacheMiddleware();
