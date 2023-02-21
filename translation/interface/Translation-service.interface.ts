import { TranslationText } from "../types/Translation-text.type";

export interface ItranslationService {
  translate(text: TranslationText, target: string): Promise<TranslationText>;
}