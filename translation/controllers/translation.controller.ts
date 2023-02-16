import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { TranslationException } from '../exception/Translation.exception';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../../exceptions/Validator.exception';
import { Text } from '../types/Translation-text.type';
import { Translation } from '../types/Translation-in-response.type';
import { DataResponse } from '../types/Data-response.type';

class TranslationController {
  public async postTranslation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<Text>> {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: Text; target: string } = req.body;
      const API_KEY: string | undefined = process.env.API_KEY;

      const apiResponse = await axios.post<DataResponse>(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: JSON.stringify(text),
          target,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );

      const translatedObj: Text = this.transferDataToObj(apiResponse.data);

      return res.json(translatedObj);
    } catch (err: any) {
      return next(
        new TranslationException({
          text: JSON.stringify(req.body.text),
          target: JSON.stringify(req.body.target),
          err: JSON.stringify(err),
        })
      );
    }
  }

  private transferDataToObj(apiDataResponse: DataResponse) {
    const [translatedResponse]: Translation[] =
      apiDataResponse.data.translations;

    return JSON.parse(
      translatedResponse.translatedText.replaceAll('&quot;', '"')
    );
  }
}
export default new TranslationController();
