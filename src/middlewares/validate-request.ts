import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { IValidationSchema, JoiRequestValidationError } from '../utils/joi.interfaces';

export function validateRequest(schema: IValidationSchema) {

  return async(
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {

    const result = [];
    const { headers, query, params, body } = req;

    try{
      if(schema.headers){
        const headerValidations = await schema.headers.validateAsync(headers);
        result.push(headerValidations);
      }
      if(schema.query){
        const queryValidations = await schema.query.validateAsync(query);
        result.push(queryValidations);
      }
      if(schema.params){
        const ParamsValidations = await schema.params.validateAsync(params);
        result.push(ParamsValidations);
      }
      if(schema.body){
        const bodyValidations = await schema.body.validateAsync(body);
        result.push(bodyValidations);
      }
      next();
    }catch (err){
      const validationsErrors = err as JoiRequestValidationError;
      const errors = validationsErrors.details.map(error => ({
        message: error.message,
        field: error.context.key,
      }));

      throw new RequestValidationError(errors);
    }
  };
}