import { NextFunction, Request, Response } from 'express';
import { v2 } from '@google-cloud/translate';
import { TranslationControllerException } from './exceptions/Translation-controller.exception';

class TranslationController {
  private readonly translateApi: v2.Translate = new v2.Translate();
  private payload: object = {};
  private target: string = 'en';

  public translate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      this.payload = req.body.payload;
      this.target = req.body.target;

      let [translations] = await this.translateApi.translate(
        JSON.stringify(this.payload),
        this.target
      );
      return res.json(JSON.parse(translations));
    } catch {
      next(
        new TranslationControllerException({
          text: JSON.stringify(req.body.payload),
          target: JSON.stringify(req.body.target),
        })
      );
    }
  };
}

export default new TranslationController();
