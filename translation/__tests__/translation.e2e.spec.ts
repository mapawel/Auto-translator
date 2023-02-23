import http from 'http';
import assert from 'assert';
import sinon from 'sinon';
import request, { Response } from 'supertest';
import { Setup } from './setup';
import { Server } from '../../app';

describe('E2E test suite:', () => {
  let setup: Setup;
  let appServer: Server;
  let server: http.Server;

  beforeEach(() => {
    setup = new Setup();

    appServer = new Server(8000);
    server = appServer.startServer();

    setup.initMockGoogleApi();
  });

  afterEach(() => {
    appServer.stopServer();
    appServer.cache.clearCache();
  });

  it('should return status 200 and translated data on POST, route /translation with correct body data', async () => {
    // when
    const response = await request(server)
      .post('/translation')
      .send(setup.sampleRequest)
      .expect('Content-Type', /json/);

    // then
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, setup.sampleResponse);
  });

  it('cache', async () => {
    // when
    const spyCacheSave = sinon.spy(appServer.cache, 'saveOne');
    const spyCacheRead = sinon.spy(appServer.cache, 'readOne');
    const spyTranslationServTranslate = sinon.spy(appServer.translationService, 'translate');

    const response = await request(server)
      .post('/translation')
      .send(setup.sampleRequest)
      .expect('Content-Type', /json/);

    const response2 = await request(server)
      .post('/translation')
      .send(setup.sampleRequest)
      .expect('Content-Type', /json/);

    // then
    sinon.assert.calledTwice(spyCacheRead);
    sinon.assert.calledOnce(spyTranslationServTranslate);
    sinon.assert.calledOnce(spyCacheSave);
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, setup.sampleResponse);
    assert.deepEqual(response.body, response2.body);
  });

  it('should return response with status 404 and payload "This site does not exist!" on request on non-existing route', async () => {
    //when
    const response = await request(server)
      .post('/nonexisting')
      .send(setup.sampleRequest)
      .expect('Content-Type', /json/);

    // then
    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.body, 'This site does not exist!');
  });

  it('should return response with status 404 and payload "This site does not exist!" on request with not managed http methos', async () => {
    //when
    const response = await request(server)
      .get('/translation')
      .expect('Content-Type', /json/);

    // then
    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.body, 'This site does not exist!');
  });

  it('should return response with status 500 and payload "Server error on try to translate." on POST request with propoer body for validator but for API translation service', async () => {
    //when
    const response = await request(server)
      .post('/translation')
      .send({ ...setup.sampleRequest, target: 'qq' })
      .expect('Content-Type', /json/);

    // then
    assert.equal(response.statusCode, 500);
    assert.deepEqual(response.body, 'Server error on try to translate.');
  });
});
