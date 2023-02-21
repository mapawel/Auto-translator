import { HttpException } from '../../exceptions/Http.exception';
export class CacheException extends HttpException {
  constructor(readonly errorPayload?: { err: string }) {
    super('Cache error', 500);
  }
}
