import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'There\'s an issue with the server, Try again later!';

  serializeErrors() {
    return [{ message: this.reason }];
  }
}