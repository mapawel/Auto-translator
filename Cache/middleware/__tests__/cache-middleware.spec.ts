import mock, { MockRequest, MockResponse } from 'node-mocks-http';
import { assert } from 'chai';
import { Request, Response } from 'express';
import { Setup } from 'import ../../../translation/__tests__/setup';
import { FileCacheService } from '../../service/File-cache-service';
import { CacheMiddleware } from '../Cache.middleware';
import { Cache } from '../../Cache';
import sinon from 'sinon';

describe('File Cache Service tests suite:', () => {
  let setup: Setup;
  let cache: Cache;
  let cacheMiddleware: CacheMiddleware;

  beforeEach(async () => {
    setup = new Setup();
    cache = new Cache(new FileCacheService());
    await cache.clearCache();
    cacheMiddleware = new CacheMiddleware(cache);
  });

  afterEach(async () => {
    await cache.clearCache();
  });

  it('should read cached data in cache middleware on request with proper data in body', async () => {
    //given
    await cache.saveOne(
      setup.sampleRequest.target,
      setup.sampleBadRequest.text,
      setup.sampleResponse
    );

    const request: MockRequest<Request> = mock.createRequest({
      body: setup.sampleRequest,
    });
    const response: MockResponse<Response> = mock.createResponse();

    // //when
    await cacheMiddleware.findInCache(request, response, () => {});

    // //then
    const controllerResData = JSON.parse(response._getData());
    assert.deepEqual(controllerResData, setup.sampleResponse);
  });

  it('should call next function when key not found in cache', async () => {
    //given
    await cache.saveOne(
      setup.sampleRequest.target,
      setup.sampleBadRequest.text,
      setup.sampleResponse
    );

    const request: MockRequest<Request> = mock.createRequest({
      body: { ...setup.sampleRequest, text: 'non-existing' },
    });
    const response: MockResponse<Response> = mock.createResponse();
    const nextSpy = sinon.spy();

    //when
    await cacheMiddleware.findInCache(request, response, nextSpy);

    //then
    sinon.assert.calledOnce(nextSpy);
  });

  it('should call next function coused passing not proper body payload and throwing Cache Exception', async () => {
    //given
    await cache.saveOne(
      setup.sampleRequest.target,
      setup.sampleBadRequest.text,
      setup.sampleResponse
    );

    const request: MockRequest<Request> = mock.createRequest({
      body: { keyCousingCacheException: 'not-proper-value' },
    });
    const response: MockResponse<Response> = mock.createResponse();
    const nextSpy = sinon.spy();

    //when
    await cacheMiddleware.findInCache(request, response, nextSpy);

    //then
    sinon.assert.calledOnce(nextSpy);
  });
});
