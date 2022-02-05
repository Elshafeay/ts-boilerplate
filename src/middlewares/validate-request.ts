import { Request, Response, NextFunction } from 'express';
import { IValidationSchema, JoiRequestValidationError } from '../utils/joi.interfaces';

export function validateRequest(schema: IValidationSchema) {

  return async(
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {

    const { headers, query, params, body } = req;

    try{
      if(schema.headers){
        await schema.headers.validateAsync(headers);
      }
      if(schema.query){
        await schema.query.validateAsync(query);
      }
      if(schema.params){
        await schema.params.validateAsync(params);
      }
      if(schema.body){
        await schema.body.validateAsync(body);
      }
      next();
    }catch (err){
      const validationsErrors = err as JoiRequestValidationError;
      const errors = validationsErrors.details.map(error => ({
        message: error.message,
        field: error.context.key,
      }));

      res.status(400).send(errors);
    }
  };
}