import User from '../components/user/user.model';
import jwt from 'jsonwebtoken';
import { IUserSerialized } from '../components/user/user.interfaces';

export class JWT {
  static sign(user: IUserSerialized){
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
    process.env.JWT_KEY!,
    );
    return token;
  }

  static verify(token: string){
    const result = jwt.verify(token, process.env.JWT_KEY!);

    return result;
  }
}
