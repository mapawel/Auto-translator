import { NextFunction, Request, Response } from 'express';
import { ITranslationController } from '../Translation-controller.interface';
import { TranslationController } from '../translation.controller';

export class TranslationControllerDecorator implements ITranslationController {
  protected component: TranslationController;

  constructor(component: TranslationController) {
    this.component = component;
    console.log(' component in decorator constructor ----> ', this.component);
  }

  public async translate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    console.log(' ----> Greetings from Decorator method', this.component );
    return this.component.translate(req, res, next);
  }
}
