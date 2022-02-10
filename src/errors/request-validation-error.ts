import { ValidationErrorSerialized } from '../utils/joi.interfaces';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationErrorSerialized[]) {
    super('Invalid request parameters');
  }

  serializeErrors() {
    return this.errors;
  }
}
