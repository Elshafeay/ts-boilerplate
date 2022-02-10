import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import Logger from './logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode)
      .send({ status: err.statusCode, errors: err.serializeErrors() });
  }

  // For any thrown errors in the application
  Logger.error(err);
  res.status(400).send({
    errors: [{ status: 400, message: 'Something went wrong' }],
  });
};
