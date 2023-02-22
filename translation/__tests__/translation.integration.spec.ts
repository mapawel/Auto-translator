import http from 'http';
import assert from 'assert';
import request, { Response } from 'supertest';
import { Setup } from './setup';
import { TranslationRouter } from '../routes/Translation.router';
import express, { Router } from 'express';
import { Cache } from '../../cache/Cache';
import { CacheMiddleware } from '../../cache/middleware/Cache.middleware';
import { TranslationService } from '../service/Translation-service';
import { TranslationController } from '../controller/translation-controller';

describe('Integration test suite: route "/translation" + validator + controller with translation serive (cache replaced with fake cache, not used!)', () => {
  let setup: Setup;
  let server: http.Server;
  let router: Router;

  beforeEach(() => {
    setup = new Setup();

    router = express.Router();
    const cache: Cache = setup.fakeCache;
    const cacheMiddleware = new CacheMiddleware(cache);
    const translationController: TranslationController =
      new TranslationController(cache, new TranslationService());
    const translationRouter = new TranslationRouter(
      router,
      cacheMiddleware,
      translationController
    );
    translationRouter.initTranslationRoutes();

    server = setup.initServerWithRouter(
      'http://localhost',
      8000,
      '/translation',
      router
    );

    setup.initMockGoogleApi();
  });

  afterEach(() => {
    server.close();
  });

  it('should return status 200 and translated data on POST, route /translation with correct body data', async () => {
    try {
      const response: Response = await request(server)
        .post(setup.route as string)
        .send(setup.sampleRequest)
        .expect('Content-Type', /json/);

      assert.equal(response.status, 200);
      assert.deepEqual(response.body, setup.sampleResponse);
    } catch (err: any) {
      throw err;
    }
  });
});
