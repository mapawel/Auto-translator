import { NextFunction, Request, Response } from 'express';
import { ITranslationController } from '../Translation-controller.interface';
import { TranslationController } from '../translation.controller';

export class TranslationControllerDecorator implements ITranslationController {
  protected component: TranslationController;

  constructor(component: TranslationController) {
    this.component = component;
    // this.translate = this.translate.bind(this);
  }

  public async translate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    return this.component.translate(req, res, next);
  }
}
