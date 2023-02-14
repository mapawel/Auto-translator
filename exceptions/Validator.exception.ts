import { HttpException } from '../exceptions/Http.exception';
import { ValidationError } from 'express-validator';

export class ValidatorException extends HttpException {
  constructor(readonly errorPayload: { errors: ValidationError[] }) {
    super('Validation failed', 400);
  }
}
