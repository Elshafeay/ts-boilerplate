import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getUserValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi
      .number()
      .required(),
  }).required(),
};