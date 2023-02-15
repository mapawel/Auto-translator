import { NextFunction, Request, Response } from 'express';
import { v2 } from '@google-cloud/translate';
import { TranslationException } from '../exception/Translation.exception';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../../exceptions/Validator.exception';
import { Text } from '../type/Translation-text.type';

class TranslationController {
  private readonly translateApi: v2.Translate = new v2.Translate();

  public async translate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<Text>> {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: Text; target: string } = req.body;

      const [translations] = await this.translateApi.translate(
        JSON.stringify(text),
        target
      );

      return res.json(JSON.parse(translations));
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
}
export default new TranslationController();
