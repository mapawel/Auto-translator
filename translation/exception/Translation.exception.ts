import { HttpException } from '../../exceptions/Http.exception';

export class TranslationException extends HttpException {
  constructor(
    readonly errorPayload: { text: string; target: string; err: string }
  ) {
    super('Server error on try to translate.', 500);
  }
}
