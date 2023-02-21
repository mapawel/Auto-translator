import http from 'http';
import express, { Router } from 'express';
import dotenvsafe from 'dotenv-safe';
import { Application } from 'express';
import { TranslationRouter } from './translation/routes/Translation.router';
import ErrorMiddleware from './middlewares/Error.middleware';
import NotFoundMiddlewere from './middlewares/NotFound.middleware';
import { TranslationService } from './translation/service/Translation-service';
import { TranslationController } from './translation/controller/translation-controller';
import { FileCacheService } from './cache/File-cache-service';
import { Cache } from './cache/Cache';
import { CacheMiddleware } from './middlewares/Cache.middleware';

dotenvsafe.config();

class Server {
  private server: http.Server | undefined;
  private readonly port: number | string = process.env.PORT || 9000;
  private readonly app: Application = express();
  private readonly router: Router = express.Router();
  private readonly cache: Cache = new Cache(new FileCacheService());
  private readonly cacheMiddleware: CacheMiddleware = new CacheMiddleware(
    this.cache
  );
  private readonly translationController: TranslationController =
    new TranslationController(this.cache, new TranslationService());

  constructor() {
    const tranlsationRouter = new TranslationRouter(
      this.router,
      this.cacheMiddleware,
      this.translationController
    );
    tranlsationRouter.initTranslationRoutes();

    this.app.use(express.json());
    this.app.use(this.router);

    this.app.use(NotFoundMiddlewere.throw);
    this.app.use(ErrorMiddleware.throw);
  }

  public startServer(): http.Server {
    this.server = http.createServer(this.app).listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
    return this.server;
  }

  public stopServer(): true | void {
    this.server?.close((err: any) => {
      if (err) throw new Error(err);
      return true;
    });
  }
}

const appServer: Server = new Server();
appServer.startServer();
