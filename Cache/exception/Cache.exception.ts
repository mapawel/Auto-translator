export class CacheException extends Error {
  constructor(readonly errorPayload?: { err: string }) {
    super('Cache error');
  }
}
