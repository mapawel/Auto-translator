import { IcacheService } from "../../cache/interface/cache-service.interface";
import { TranslationText } from "../types/Translation-text.type";

export class FakeCache implements IcacheService {
  public async read(target: string, key: TranslationText): Promise<TranslationText | undefined>{
    return undefined;
  }
  
  public async save(target: string, key: TranslationText, data: TranslationText): Promise<boolean>{
    return true;
  }
  
  public async remove(target: string, key: TranslationText): Promise<boolean>{
    return true;
  }
  
  public async clearCache(): Promise<boolean>{
    return true;
  }

}