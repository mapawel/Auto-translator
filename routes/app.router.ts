import express, { Router, Request, Response } from 'express';

export class AppRouter {
  public readonly router: Router = express.Router();

  constructor() {
    this.router.get('/test', (req: Request, res: Response) => {
      return res.send('Welcome to test route!!');
    });
  }
}
