import { NextFunction, Request, Response } from 'express';
import { v2 } from '@google-cloud/translate';
import { TranslationControllerException } from './exceptions/Translation-controller.exception';
import { validationResult, Result, ValidationError } from 'express-validator';
import { ValidatorException } from '../exceptions/Validator.exception';

class TranslationController {
  private readonly translateApi: v2.Translate = new v2.Translate();

  public translate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty())
        return next(new ValidatorException({ errors: errors.array() }));

      const { text, target }: { text: object; target: string } = req.body;

      let [translations] = await this.translateApi.translate(
        JSON.stringify(text),
        target
      );
      return res.json(JSON.parse(translations));
      res.end();
    } catch (err: any) {
      return next(
        new TranslationControllerException({
          text: JSON.stringify(req.body.text),
          target: JSON.stringify(req.body.target),
        })
      );
    }
  };
}

export default new TranslationController();
