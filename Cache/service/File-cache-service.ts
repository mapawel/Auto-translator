import { writeFile, readFile, stat, unlink, readdir } from 'fs/promises';
import path from 'path';
import { Text } from '../../translation/types/Translation-text.type';
import { IcacheService } from '../interface/cache-service.interface';

export class FileCacheService implements IcacheService {
  public async readOne(target: string, key: Text): Promise<Text | undefined> {
    const fullCacheMap: Map<string, Text> | null = await this.readAll(target);
    if (!fullCacheMap) return undefined;

    return fullCacheMap.get(JSON.stringify(key));
  }

  public async saveOne(target: string, key: Text, data: Text) {
    const prevData: Map<string, Text> | null = await this.readAll(target);
    const map = prevData || new Map();
    map.set(JSON.stringify(key), data);
    await writeFile(
      this.filenameWhPath(target),
      JSON.stringify(Array.from(map.entries()))
    );
    return true;
  }

  public async removeOne(target: string, key: Text): Promise<boolean> {
    const prevData: Map<string, Text> | null = await this.readAll(target);
    const map = prevData || new Map();
    map.delete(JSON.stringify(key));
    await writeFile(
      this.filenameWhPath(target),
      JSON.stringify(Array.from(map.entries()))
    );
    return true;
  }

  public async readAll(target: string): Promise<Map<string, Text> | null> {
    const isFileAlready: boolean = await this.isFile(
      this.filenameWhPath(target)
    );
    if (!isFileAlready) return null;

    const content = await readFile(this.filenameWhPath(target), {
      encoding: 'utf-8',
    });

    return new Map(JSON.parse(content));
  }

  public async removeAll(target: string): Promise<boolean> {
    const isFileAlready: boolean = await this.isFile(
      this.filenameWhPath(target)
    );
    if (!isFileAlready)
      throw new Error('File with this language cache not found');

    await unlink(this.filenameWhPath(target));
    return true;
  }

  public async clearCache(): Promise<boolean> {
    const files = await readdir(this.pathToCacheFiles());
    for (const file of files) {
      await unlink(path.join(this.pathToCacheFiles(), file));
    }
    return true;
  }

  private async isFile(path: string): Promise<boolean> {
    return !!(await stat(path).catch(() => false));
  }

  private pathToCacheFiles(): string {
    return path.join(process.cwd(), 'data', 'cache');
  }

  private filenameWhPath(name: string): string {
    return `${path.join(path.join(process.cwd(), 'data', 'cache'), name)}.txt`;
  }
}
