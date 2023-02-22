import assert from 'assert';
import mock, { MockRequest, MockResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import { TranslationController } from '../translation-controller';
import { Setup } from '../../__tests__/setup';
import { TranslationService } from '../../service/Translation-service';
import { Cache } from '../../../cache/Cache';
import { FileCacheService } from '../../../cache/service/File-cache-service';
import sinon from 'sinon';
import { TranslationException } from '../../exception/Translation.exception';

describe('Translation controller test suite:', () => {
  let setup: Setup;

  beforeEach(() => {
    setup = new Setup();
    setup.initMockGoogleApi();
  });

  it('should return status 200 and translated data from method postTranslation() using translation service, not-cache.', async () => {
    try {
      //given
      const cache: Cache = setup.fakeCache;
      const translationService: TranslationService = new TranslationService();
      const translationController = new TranslationController(
        cache,
        translationService
      );

      const request: MockRequest<Request> = mock.createRequest({
        body: setup.sampleRequest,
      });
      const response: MockResponse<Response> = mock.createResponse();

      //when
      await translationController.postTranslation(request, response, () => {});

      //then
      const controllerResData = JSON.parse(response._getData());

      assert.equal(response.statusCode, 200);
      assert.deepEqual(controllerResData, setup.sampleResponse);
    } catch (err: any) {
      throw err;
    }
  });

  it('should save translated data in file-cache and then return them.', async () => {
    try {
      //given
      const cache: Cache = new Cache(new FileCacheService());
      const translationService: TranslationService = new TranslationService();
      const translationController = new TranslationController(
        cache,
        translationService
      );

      const cacheSaveSpy = sinon.spy(cache, 'saveOne');

      const request: MockRequest<Request> = mock.createRequest({
        body: setup.sampleRequest,
      });
      const response: MockResponse<Response> = mock.createResponse();

      //when
      await translationController.postTranslation(request, response, () => {});

      //then
      const controllerResData = JSON.parse(response._getData());
      const cachedData = await cache.readOne(
        setup.sampleRequest.target,
        setup.sampleRequest.text
      );

      sinon.assert.calledOnce(cacheSaveSpy);
      assert.deepEqual(cachedData, setup.sampleResponse);

      assert.equal(response.statusCode, 200);
      assert.deepEqual(controllerResData, setup.sampleResponse);
    } catch (err: any) {
      throw err;
    }
  });

  it('should catch a translation service error coused by passing wrong param to API request', async () => {
    try {
      //given
      const cache: Cache = setup.fakeCache;
      const translationService: TranslationService = new TranslationService();
      const translationController = new TranslationController(
        cache,
        translationService
      );

      const request: MockRequest<Request> = mock.createRequest({
        body: { ...setup.sampleRequest, target: 'non-existing' },
      });
      const response: MockResponse<Response> = mock.createResponse();
      const next = sinon.spy();

      //when
      await translationController.postTranslation(request, response, next);

      //then
      sinon.assert.calledOnce(next);
    } catch (err: any) {
      throw err;
    }
  });
});
