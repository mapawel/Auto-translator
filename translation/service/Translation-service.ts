
import axios from 'axios';
import { Text } from '../types/Translation-text.type';
import { Translation } from '../types/Translation-in-response.type';
import { DataResponse } from '../types/Data-response.type';
import { ItranslationService } from '../interface/Translation-service.interface';

export class TranslationService implements ItranslationService {
  public async translate(text: Text, target: string): Promise<Text> {
    const API_KEY: string | undefined = process.env.API_KEY;

    const q: string = JSON.stringify(text);

    const apiResponse = await axios.post<DataResponse>(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q,
        target,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );

    const translatedString: string = this.transferDataToString(
      apiResponse.data
    );
    const translatedObj: Text = JSON.parse(translatedString);

    return translatedObj;
  }

  private transferDataToString(apiDataResponse: DataResponse) {
    const [translatedResponse]: Translation[] =
      apiDataResponse.data.translations;

    return translatedResponse.translatedText.replaceAll('&quot;', '"');
  }
}
