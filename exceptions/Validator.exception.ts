import { HttpException } from '../exceptions/Http.exception';
import { ValidationError } from 'express-validator';

export class ValidatorException extends HttpException {
  readonly message: string;
  readonly code: number;
  readonly errors: ValidationError[];

  constructor(readonly errorPayload: { errors: ValidationError[] }) {
    super('Validation failed', 400);
    this.message = 'Validation failed';
    this.code = 400;
    this.errors = errorPayload.errors;
  }
}
