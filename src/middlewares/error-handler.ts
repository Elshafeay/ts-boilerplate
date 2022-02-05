import { Request, Response, NextFunction } from 'express';
import Logger from './logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  // For any thrown errors in the application
  Logger.error(err);

  res.status(400).send({
    status: 400,
    message: 'Something went wrong',
  });
};
