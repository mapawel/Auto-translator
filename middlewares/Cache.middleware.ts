import { Request, Response, NextFunction } from 'express';
import cache from '../Cache/Cache';
import { Text } from '../translation/types/Translation-text.type';

class CacheMiddleware {
  findInCache = async (req: Request, res: Response, next: NextFunction) => {
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
