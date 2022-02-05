import { Express } from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import UserController from './user.controller';
import { getUserValidation } from './user.schemas';

const userRouter = (app: Express) => {
  app.get('/users', UserController.getUsers);
  app.get('/users/:id', validateRequest(getUserValidation), UserController.getUser);
  app.post('/users', UserController.signUp);
};

export default userRouter;