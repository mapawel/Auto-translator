import express, { Router } from 'express';
import TranslationController from '../controllers/translation.controller';

export class AppRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.post('/translate', TranslationController.translate);
  }
}
