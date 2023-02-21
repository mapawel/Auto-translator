import axios from 'axios';
import { TranslationText } from '../types/Translation-text.type';
import { APItranslation } from '../types/Data.models';
import { APIdataResponse } from '../types/Data.models';
import { ItranslationService } from '../interface/Translation-service.interface';

export class TranslationService implements ItranslationService {
  public async translate(
    text: TranslationText,
    target: string
  ): Promise<TranslationText> {
    const API_KEY: string | undefined = process.env.API_KEY;
    const GOOGLE_TRANSLATE_API_BASE_URL: string | undefined =
      process.env.GOOGLE_TRANSLATE_API_BASE_URL;

    const q: string = JSON.stringify(text);

    const apiResponse = await axios.post<APIdataResponse>(
      `${GOOGLE_TRANSLATE_API_BASE_URL}?key=${API_KEY}`,
      {
        q,
        target,
      }
    );

    const translatedString: string = this.transferDataToString(
      apiResponse.data
    );
    const translatedObj: TranslationText = JSON.parse(translatedString);

    return translatedObj;
  }

  private transferDataToString(apiDataResponse: APIdataResponse) {
    const [translatedResponse]: APItranslation[] =
      apiDataResponse.data.translations;

    return translatedResponse.translatedText.replaceAll('&quot;', '"');
  }
}
