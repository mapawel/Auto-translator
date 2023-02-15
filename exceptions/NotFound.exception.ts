import { HttpException } from './Http.exception';

export class NotFoundException extends HttpException {
  constructor(readonly payload?: { method?: string, url?: string }) {
    super('This site does not exist!', 404);
  }
}
