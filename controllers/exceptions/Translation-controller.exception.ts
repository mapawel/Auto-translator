import { HttpException } from '../../exceptions/Http.exception';

export class TranslationControllerException extends HttpException {
  readonly message: string;
  readonly code: number;

  constructor(readonly errorPayload?: { text: string; target?: string }) {
    super('', 500);
    this.message = '';
    this.code = 500;
  }
}
