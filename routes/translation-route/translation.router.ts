import express, { Router } from 'express';
import TranslationController from '../../controllers/translation.controller';
import { translationValidator } from './translation-route.validator';

export class TranslationRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.post(
      '/translate',
      translationValidator,
      TranslationController.translate
    );
  }
}
