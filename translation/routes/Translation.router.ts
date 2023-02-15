import express, { Router, Request, Response, NextFunction } from 'express';
import { translationValidator } from '../validator/translation.validator';
import translationController from '../controllers/translation.controller';

export class TranslationRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.post(
      '/translation',
      translationValidator,
      (req: Request, res: Response, next: NextFunction) =>
        translationController.translate(req, res, next)
    );
  }
}
