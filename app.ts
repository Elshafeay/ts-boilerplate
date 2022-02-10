import express, { Request, Response } from 'express';

// to pass the async errors to the error handler automatically
// without the need to use next() with every route
import 'express-async-errors';

import { NotFoundError } from './src/errors/not-found-error';
import { errorHandler } from './src/middlewares/error-handler';
import routing from './src/components/routes';
import { currentUser } from './src/middlewares/current-user';
import morganMiddleware from './src/middlewares/morgan';

const app = express();
app.use(express.json());
app.use(currentUser);
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the home page!');
});

routing.api(app);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;