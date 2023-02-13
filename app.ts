import express, { Router, Request, Response, NextFunction } from 'express';
import dotenvsafe from 'dotenv-safe';
import { Application } from 'express';
import { AppRouter } from './routes/app.router';
import ErrorMiddleware from './middlewares/Error.middleware';
import Middlewere404 from './middlewares/404.middleware';

dotenvsafe.config();

class Server {
  private readonly port: number | string = process.env.PORT || 9000;
  private readonly app: Application = express();
  private readonly router: Router = new AppRouter().router;

  constructor() {
    this.app.use(express.json());
    this.app.use(this.router);

    this.app.use(Middlewere404.throw);
    this.app.use(ErrorMiddleware.throw);

    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }
}

new Server();
