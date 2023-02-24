import path = require('path');
import { readdir } from 'fs/promises';
import { assert } from 'chai';
import { Setup } from 'import ../../../translation/__tests__/setup';
import { TranslationText } from '../../../translation/types/Translation-text.type';
import { FileCacheService } from '../File-cache-service';

describe('File Cache Service tests suite:', () => {
  let setup: Setup;
  let fileCacheService: FileCacheService;

  beforeEach(async () => {
    setup = new Setup();
    fileCacheService = new FileCacheService();
    await fileCacheService.clearCache();
  });

  afterEach(async () => {
    await fileCacheService.clearCache();
  });

  it('should save item in file cache and then read it from file cache', async () => {
    //when
    await fileCacheService.save(
      setup.sampleRequest.target,
      setup.sampleRequest.text,
      setup.sampleResponse
    );
    //when + then
    const expectedCachedResponse: TranslationText | undefined =
      await fileCacheService.read(
        setup.sampleRequest.target,
        setup.sampleRequest.text
      );

    //then
    assert.deepEqual(expectedCachedResponse, setup.sampleResponse);
  });

  it('should save item in file cache and then remove this item', async () => {
    //when
    await fileCacheService.save(
      setup.sampleRequest.target,
      setup.sampleRequest.text,
      setup.sampleResponse
    );
    await fileCacheService.remove(
      setup.sampleRequest.target,
      setup.sampleRequest.text
    );
    //when + then
    const expectedCachedResponse: TranslationText | undefined =
      await fileCacheService.read(
        setup.sampleRequest.target,
        setup.sampleRequest.text
      );

    //then
    assert.isUndefined(expectedCachedResponse);
  });

  it('should save item in file at .data/cache', async () => {
    //when
    await fileCacheService.save(
      setup.sampleRequest.target,
      setup.sampleRequest.text,
      setup.sampleResponse
    );

    //then
    const files = await readdir(path.join(process.cwd(), 'data', 'cache'));
    assert.equal(files[0], `${setup.sampleRequest.target}.txt`);
  });

  it('should empty foder ./data/cache', async () => {
    //when
    await fileCacheService.save(
      setup.sampleRequest.target,
      setup.sampleRequest.text,
      setup.sampleResponse
    );
    await fileCacheService.clearCache();

    //then
    const files = await readdir(path.join(process.cwd(), 'data', 'cache'));
    assert.isUndefined(files[0]);
  });

  it('should remove cached data on clearCache()', async () => {
    //when
    await fileCacheService.save(
      setup.sampleRequest.target,
      setup.sampleRequest.text,
      setup.sampleResponse
    );

    await fileCacheService.clearCache();
    //when + then
    const expectedCachedResponse: TranslationText | undefined =
      await fileCacheService.read(
        setup.sampleRequest.target,
        setup.sampleRequest.text
      );

    //then
    assert.isUndefined(expectedCachedResponse);
  });
});
