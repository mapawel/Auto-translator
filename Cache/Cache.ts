import { TranslationText } from '../translation/types/Translation-text.type';
import { IcacheService } from './interface/cache-service.interface';

export class Cache {
  constructor(private readonly cacheService: IcacheService) {}

  public async readOne(
    target: string,
    key: TranslationText
  ): Promise<TranslationText | undefined> {
    return await this.cacheService.read(target, key);
  }

  public async saveOne(
    target: string,
    key: TranslationText,
    data: TranslationText
  ): Promise<boolean> {
    return await this.cacheService.save(target, key, data);
  }

  public async removeOne(
    target: string,
    key: TranslationText
  ): Promise<boolean> {
    return await this.cacheService.remove(target, key);
  }

  public async clearCache(): Promise<boolean> {
    return await this.cacheService.clearCache();
  }
}
