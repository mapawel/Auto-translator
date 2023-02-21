import assert from 'assert';
import { TranslationService } from '../Translation-service';
import { TranslationText } from '../../types/Translation-text.type';
import { ItranslationService } from '../../interface/Translation-service.interface';
import { Setup } from '../../__tests__/setup';
describe('TranslationService test suite:', () => {
  let setup: Setup;

  beforeEach(() => {
    setup = new Setup();
    setup.initMockGoogleApi();
  });

  it('should return translated text from service method', async () => {
    //given
    const translationService: ItranslationService = new TranslationService();
    const { text, target }: { text: TranslationText; target: string } =
      setup.sampleRequest;

    //when
    const expectedTranslatedObj: TranslationText =
      await translationService.translate(text, target);

    //then
    assert.deepEqual(expectedTranslatedObj, setup.sampleResponse);
  });
});
