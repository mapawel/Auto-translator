// import { NextFunction, Request, Response } from 'express';
// import axios from 'axios';
// import { TranslationException } from '../exception/Translation.exception';
// import { validationResult, Result, ValidationError } from 'express-validator';
// import { ValidatorException } from '../../exceptions/Validator.exception';
// import { Text } from '../types/Translation-text.type';
// import { Translation } from '../types/Translation-in-response.type';
// import { DataResponse } from '../types/Data-response.type';
// import { Cache } from '../../cache/Cache';
// import { IcacheService } from 'cache/interface/cache-service.interface';

// export class TranslationService {
//   constructor(private readonly cache: Cache) {}

//   private async saveInCache(target: string, text: Text, translatedObj: Text) {
//     await this.cache.saveOne(target, text, translatedObj);
//   }

//   public async postTranslation(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void | Response<Text>> {
//     try {
//       const errors: Result<ValidationError> = validationResult(req);
//       if (!errors.isEmpty())
//         return next(new ValidatorException({ errors: errors.array() }));

//       const { text, target }: { text: Text; target: string } = req.body;

//       const API_KEY: string | undefined = process.env.API_KEY;

//       const q: string = JSON.stringify(text);

//       const apiResponse = await axios.post<DataResponse>(
//         `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
//         {
//           q,
//           target,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//           },
//         }
//       );

//       const translatedString: string = this.transferDataToString(
//         apiResponse.data
//       );
//       const translatedObj: Text = JSON.parse(translatedString);

//       await this.saveInCache(target, text, translatedObj);

//       return res.json(translatedObj);
//     } catch (err: any) {
//       return next(
//         new TranslationException({
//           text: JSON.stringify(req.body.text),
//           target: JSON.stringify(req.body.target),
//           sourceMessage: err.message,
//           err: err.errorPayload?.err
//             ? JSON.stringify(err.errorPayload.err)
//             : JSON.stringify(err),
//         })
//       );
//     }
//   }

//   private transferDataToString(apiDataResponse: DataResponse) {
//     const [translatedResponse]: Translation[] =
//       apiDataResponse.data.translations;

//     return translatedResponse.translatedText.replaceAll('&quot;', '"');
//   }
// }
