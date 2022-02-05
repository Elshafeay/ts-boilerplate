import { Express } from 'express';
import userRouter from './user/user.routes';

class routing {

  api(app: Express) {
    userRouter(app);
  }
}
export default new routing();