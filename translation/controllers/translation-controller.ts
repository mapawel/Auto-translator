import { NextFunction, Request, Response } from 'express';
import { TranslationException } from '../exception/Translation.exception';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../../exceptions/Validator.exception';
import { Text } from '../types/Translation-text.type';
import { Cache } from '../../cache/Cache';
import { ItranslationService } from '../interface/Translation-service.interface';

export class TranslationController {
  constructor(
    private readonly cache: Cache,
    private readonly translationService: ItranslationService
  ) {}
  public postTranslation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<Text>> => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: Text; target: string } = req.body;

      const translatedObj = await this.translationService.translate(
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
  };

  private async saveInCache(target: string, text: Text, translatedObj: Text) {
    await this.cache.saveOne(target, text, translatedObj);
  }
}
