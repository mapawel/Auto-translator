import { NextFunction, Request, Response } from 'express';
import { ITranslationController } from '../Translation-controller.interface';

export class TranslationControllerDecorator implements ITranslationController {
  protected component: ITranslationController;

  constructor(component: ITranslationController) {
    this.component = component;
  }

  public translate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> => {
    return this.component.translate(req, res, next);
  };
}
