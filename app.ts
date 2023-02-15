import express, { Router } from 'express';
import dotenvsafe from 'dotenv-safe';
import { Application } from 'express';
import { TranslationRouter } from './translation/routes/Translation.router';
import ErrorMiddleware from './middlewares/Error.middleware';
import NotFoundMiddlewere from './middlewares/NotFound.middleware';

dotenvsafe.config();

class Server {
  private readonly port: number | string = process.env.PORT || 9000;
  private readonly app: Application = express();
  private readonly router: Router = new TranslationRouter().router;

  constructor() {
    this.app.use(express.json());
    this.app.use(this.router);

    this.app.use(NotFoundMiddlewere.throw);
    this.app.use(ErrorMiddleware.throw);

    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }
}

new Server();
