import { Text } from "../types/Translation-text.type";

export interface ItranslationService {
  translate(text: Text, target: string): Promise<Text>;
}