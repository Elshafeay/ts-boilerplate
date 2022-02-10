import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, IUserSerialized } from '../components/user/user.interfaces';
import User from '../components/user/user.model';

interface UserPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserSerialized;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    return next();
  }

  const bearerToken = req.headers.authorization;  // "Bearer blablablablablabla"
  const token = bearerToken.split(' ')[1];
  const payload = jwt.verify(
    token,
    process.env.JWT_KEY!,
  ) as UserPayload;

  const user = await User.findOneById(payload.id);
  if(!user){
    return next();
  }

  req.user = user;

  next();
};
