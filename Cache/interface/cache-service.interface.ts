import { TranslationText } from "../../translation/types/Translation-text.type";

export interface IcacheService {
  read(target: string, key: TranslationText): Promise<TranslationText | undefined>;
  save(target: string, key: TranslationText, data: TranslationText): Promise<boolean>;
  remove(target: string, key: TranslationText): Promise<boolean>;
  clearCache(): Promise<boolean>;
}
