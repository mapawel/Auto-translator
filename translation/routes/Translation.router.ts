import { Router, Request, Response, NextFunction } from 'express';
import { translationValidator } from '../validator/translation.validator';
import translationController from '../controllers/translation.controller';

export class TranslationRouter {
  constructor(private readonly router: Router) {}

  public initTranslationRoutes() {
    this.router.post(
      '/translation',
      translationValidator,
      (req: Request, res: Response, next: NextFunction) =>
        translationController.translate(req, res, next)
    );
  }
}
