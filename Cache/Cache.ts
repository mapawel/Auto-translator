import { Text } from '../translation/types/Translation-text.type';
import { IcacheService } from './interface/cache-service.interface';

export class Cache {
  constructor(private readonly cacheService: IcacheService) {}

  public async readOne(target: string, key: Text): Promise<Text | undefined> {
    return this.cacheService.readOne(target, key);
  }

  public async saveOne(
    target: string,
    key: Text,
    data: Text
  ): Promise<boolean> {
    return this.cacheService.saveOne(target, key, data);
  }

  public async removeOne(target: string, key: Text): Promise<boolean> {
    return this.cacheService.removeOne(target, key);
  }

  public async readAll(target: string): Promise<Map<string, Text> | null> {
    return this.cacheService.readAll(target);
  }

  public async removeAll(target: string): Promise<boolean> {
    return this.cacheService.removeAll(target);
  }

  public async clearCache(): Promise<boolean> {
    return this.cacheService.clearCache();
  }
}
