import assert from 'assert';
import express from 'express';
import axios from 'axios';
import http from 'http';
import { Setup } from './setup';
import { TranslationRouter } from '../routes/Translation.router';

describe('Translation router + validator + cache + controller test suite:', () => {
  let setup: Setup;
  let server: http.Server;

  beforeEach(() => {
    setup = new Setup();
    const router = express.Router();
    new TranslationRouter(router).initTranslationRoutes();
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
      //when
      const response = await axios.post(
        `${setup.baseUrl}:${setup.port}${setup.route}`,
        setup.sampleRequest
      );

      //then
      assert.equal(response.status, 200);
      assert.deepEqual(response.data, setup.sampleResponse);
    } catch (err: any) {
      throw err;
    }
  });
});
