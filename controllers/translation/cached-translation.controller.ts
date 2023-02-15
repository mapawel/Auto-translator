import {NextFunction, Request, Response} from 'express';
import {TranslationControllerDecorator} from './Decorator/Translation-controller.decorator';
import {TranslationController} from './translation.controller';

class CachedTranslationController extends TranslationControllerDecorator {
  constructor(component: TranslationController) {
    super(component);
  }

  public async translate(
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    console.log(this)
    return super.translate(req, res, next);
  }
}

export default new CachedTranslationController(new TranslationController());
