import express, { Express } from 'express';
import userRouter from './user/user.routes';

const apiRouter = express.Router();

apiRouter.use(userRouter);

export default apiRouter;