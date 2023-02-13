import express, { Router } from 'express';
import dotenvsafe from 'dotenv-safe'
import { Application } from 'express';
import { AppRouter } from './routes/app.router';
dotenvsafe.config()

class Server {
  private readonly port: number | string = process.env.PORT || 9000;
  private readonly app: Application = express();
  private readonly router: Router = new AppRouter().router;

  constructor() {
    this.app.use(this.router);

    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }
}

new Server();
