import dotenvsafe from 'dotenv-safe';
import http = require('http');
import express, {
  Request,
  Response,
  NextFunction,
  Router,
  Application,
} from 'express';
import nock, { Scope } from 'nock';
import { APIdataResponse } from '../types/Data.models';
import { TranslationText } from '../types/Translation-text.type';
import { Cache } from '../../cache/Cache';
import { FakeCache } from './Fake-cache-service.setup';

export class Setup {
  private _baseUrl: string | undefined;
  private _port: number | undefined;
  private _route: string | undefined;

  public readonly fakeCacheService = new FakeCache();

  public readonly fakeCache = new Cache(this.fakeCacheService);

  public readonly sampleRequest: { text: TranslationText; target: string } = {
    text: {
      newsletter: {
        title: 'Bądź na bieżąco 32222',
        ctaButton: 'Idź do repo ->',
        action: '/new-subscriber?lang=pl',
      },
    },
    target: 'de',
  };

  public readonly sampleResponse = {
    newsletter: {
      title: `RESPONSE: ${this.sampleRequest.text.newsletter.title}`,
      ctaButton: `RESPONSE: ${this.sampleRequest.text.newsletter.ctaButton}`,
      action: `RESPONSE: ${this.sampleRequest.text.newsletter.action}`,
    },
  };

  public readonly apiResponse: APIdataResponse = {
    data: {
      translations: [
        {
          translatedText: JSON.stringify(this.sampleResponse),
          detectedSourceLanguage: this.sampleRequest.target,
        },
      ],
    },
  };

  constructor() {
    dotenvsafe.config();
  }

  get route(): string | undefined {
    return this._route;
  }

  get baseUrl(): string | undefined {
    return this._baseUrl;
  }

  get port(): number | undefined {
    return this._port;
  }

  public initServerWithRouter(
    baseUrl: string,
    port: number,
    route: string,
    passedRouter: Router
  ): http.Server {
    const app = express();
    app.use(express.json());
    app.use(passedRouter);

    this._baseUrl = baseUrl;
    this._port = port;
    this._route = route;

    return http.createServer(app).listen(this._port);
  }

  public initTestServer(
    baseUrl: string,
    port: number,
    route: string,
    controllerMethod: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void | Response<TranslationText>>
  ): http.Server {
    this._baseUrl = baseUrl;
    this._port = port;
    this._route = route;
    const app = express();
    app.use(express.json());
    app.post(route, controllerMethod);

    return http.createServer(app).listen(this._port);
  }

  public initMockGoogleApi(): void {
    const API_KEY: string | undefined = process.env.API_KEY;

    const nocServerWhPath: Scope = nock('https://translation.googleapis.com');
    nocServerWhPath
      .post(`/language/translate/v2?key=${API_KEY}`, {
        q: JSON.stringify(this.sampleRequest.text),
        target: this.sampleRequest.target,
      })
      .reply(200, this.apiResponse);
  }
}
