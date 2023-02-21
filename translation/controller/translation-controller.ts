import { NextFunction, Request, Response } from 'express';
import { TranslationException } from '../exception/Translation.exception';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../../exceptions/Validator.exception';
import { TranslationText } from '../../translation/types/Translation-text.type';
import { Cache } from '../../cache/Cache';
import { ItranslationService } from '../interface/Translation-service.interface';

export class TranslationController {
  constructor(
    private readonly cache: Cache,
    private readonly translationService: ItranslationService
  ) {}
  public async postTranslation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<TranslationText>> {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: TranslationText; target: string } =
        req.body;

      const translatedObj:TranslationText = await this.translationService.translate(
        text,
        target
      );

      await this.saveInCache(target, text, translatedObj);

      return res.json(translatedObj);
    } catch (err: any) {
      return next(
        new TranslationException({
          text: JSON.stringify(req.body.text),
          target: JSON.stringify(req.body.target),
          sourceMessage: err.message,
          err: err.errorPayload?.err
            ? JSON.stringify(err.errorPayload.err)
            : JSON.stringify(err),
        })
      );
    }
  }

  private async saveInCache(
    target: string,
    text: TranslationText,
    translatedObj: TranslationText
  ) {
    await this.cache.saveOne(target, text, translatedObj);
  }
}
