import { writeFile } from 'fs/promises';
import path from 'path';

class Cache {
  public async saveToCache(target: string, key: string, data: string) {
    try {
      await writeFile(
        `${path.join(process.cwd(), 'data', 'cache', target)}.txt`,
        `[${key}, ${data}]`
      );
    } catch (err) {
      throw err;
    }
  }

  public loadFromCache() {}
}

export default new Cache();
