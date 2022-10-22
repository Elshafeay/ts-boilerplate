import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getUserValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi
      .number()
      .min(0)
      .required(),
  }).required(),
};

export const createUserValidation: IValidationSchema = {
  body: Joi.object({
    firstname: Joi
      .string()
      .min(2)
      .required(),
    lastname: Joi
      .string()
      .min(2)
      .required(),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(8)
      .required(),
  }).required(),
};