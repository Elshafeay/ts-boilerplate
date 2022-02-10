import { Express } from 'express';
import user from './user/user.routes';

class routing {

  api(app: Express) {
    user(app);
  }
}
export default new routing();