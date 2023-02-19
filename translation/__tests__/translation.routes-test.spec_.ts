import http from 'http';
import chai, { expect } from 'chai';
import assert from 'assert';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import request, { Response } from 'supertest';
import { Setup } from './setup';
import { TranslationRouter } from '../routes/Translation.router';
import express, {
  NextFunction,
  Router,
  Request as ERequest,
  Response as EResponse,
} from 'express';
chai.use(sinonChai);

describe('Translation router test suite:', () => {
  let setup: Setup;
  let server: http.Server;
  let router: Router;

  const controllerStubFn = (
    req: ERequest,
    res: EResponse,
    next: NextFunction
  ) => {
    return res.json({ text: 'Hello, world!' });
  };

  beforeEach(() => {
    setup = new Setup();

    router = express.Router();
    TranslationRouter.initTranslationRoutes(router, controllerStubFn);

    server = setup.initServerWithRouter(
      'http://localhost',
      8000,
      '/translation',
      router
    );
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
      assert.deepEqual(response.body, { text: 'Hello, world!' });
    } catch (err: any) {
      throw err;
    }
  });
});
