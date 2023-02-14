import { HttpException } from '../../exceptions/Http.exception';

export class TranslationControllerException extends HttpException {
  constructor(readonly errorPayload: { text: string; target: string }) {
    super('Server error on try to translate.', 500);
  }
}
