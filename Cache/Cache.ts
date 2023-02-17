import { writeFile, readFile, stat } from 'fs/promises';
import path from 'path';
import { Text } from '../translation/types/Translation-text.type';
import { CacheException } from './exception/Cache.exception';

class Cache {
  public async saveToCache(target: string, key: Text, data: Text) {
    try {
      const prevData: Map<string, Text> | null = await this.loadFullCacheAsMap(
        target
      );
      const map = prevData || new Map();
      map.set(JSON.stringify(key), data);
      await writeFile(
        this.filenameWhPath(target),
        JSON.stringify(Array.from(map.entries()))
      );
    } catch (err: any) {
      throw new CacheException({ err });
    }
  }

  public async findInCache(
    target: string,
    key: Text
  ): Promise<Text | undefined> {
    try {
      const fullCacheMap: Map<string, Text> | null =
        await this.loadFullCacheAsMap(target);
      if (!fullCacheMap) return undefined;

      return fullCacheMap.get(JSON.stringify(key));
    } catch (err: any) {
      throw new CacheException({ err });
    }
  }

  private async loadFullCacheAsMap(
    target: string
  ): Promise<Map<string, Text> | null> {
    try {
      const isFileAlready: boolean = await this.isFile(
        this.filenameWhPath(target)
      );
      if (!isFileAlready) return null;

      const content = await readFile(this.filenameWhPath(target), {
        encoding: 'utf-8',
      });

      return new Map(JSON.parse(content));
    } catch (err: any) {
      throw new CacheException({ err });
    }
  }

  private async isFile(path: string): Promise<boolean> {
    return !!(await stat(path).catch(() => false));
  }

  private filenameWhPath(name: string): string {
    return `${path.join(process.cwd(), 'data', 'cache', name)}.txt`;
  }
}

export default new Cache();
