import { Text } from '../../translation/types/Translation-text.type';

export interface IcacheService {
  readOne(target: string, key: Text): Promise<Text | undefined>;
  saveOne(target: string, key: Text, data: Text): Promise<boolean>;
  removeOne(target: string, key: Text): Promise<boolean>;
  readAll(target: string): Promise<Map<string, Text> | null>;
  removeAll(target: string): Promise<boolean>;
  clearCache(): Promise<boolean>;
}
