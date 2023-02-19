import assert from 'assert';
import express from 'express';
import request, { Response } from 'supertest';
import http from 'http';
import { Setup } from './setup';
import { TranslationRouter } from '../routes/Translation.router';
import translationController from '../controllers/translation.controller';

describe('Translation router + validator + cache:', () => {
  let setup: Setup;
  let server: http.Server;

  beforeEach(() => {
    setup = new Setup();
    const router = express.Router();
    TranslationRouter.initTranslationRoutes(
      router,
      translationController.postTranslation.bind(translationController)
    );
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

      // then
      assert.equal(response.statusCode, 200);
      assert.deepEqual(response.body, setup.sampleResponse);
    } catch (err: any) {
      throw err;
    }
  });
});
