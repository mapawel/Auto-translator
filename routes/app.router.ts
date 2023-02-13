import express, { Router, Request, Response } from 'express';
import TranslationController from '../controllers/translation.controller';

export class AppRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.get('/test', TranslationController.getTranslationasync);
  }
}
