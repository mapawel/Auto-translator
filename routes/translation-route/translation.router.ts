import express, { Router } from 'express';
import cachedTranslationController from '../../controllers/translation/Cached-translation.controller';
import { translationValidator } from './translation-route.validator';

export class TranslationRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.post(
      '/translate',
      translationValidator,
      cachedTranslationController.translate
    );
  }
}
