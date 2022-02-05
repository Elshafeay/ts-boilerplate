import Joi from 'joi';

export interface IValidationSchema {
  headers?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  body?: Joi.Schema;
}

export interface JoiRequestValidationErrorContext {
  label: string,
  value: string,
  key: string,
}

export interface JoiRequestValidationErrorDetails {
  message: 'string',
  path: [],
  type: 'string',
  context: JoiRequestValidationErrorContext
}

export interface JoiRequestValidationError {
  _original: any,
  details: JoiRequestValidationErrorDetails[],
}

export interface ValidationErrorSerialized {
  message: string,
  field: string
}
