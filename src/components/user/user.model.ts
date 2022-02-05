import Common from '../../utils/common';
import { ICreateUser, IUser, IUserSerialized } from './user.interfaces';

class User {
  static tableName = 'users';

  static async findOneById(id: number): Promise<IUserSerialized | null>{
    const rows = await Common.dbFetch(User.tableName, { id });
    if(rows?.length){
      const user = rows[0] as IUserSerialized;

      // removing password from the object before serializing it
      user.password = undefined;
      return user;
    }else{
      return null;
    }
  }

  static async findOneByEmail(email: string): Promise<IUser | null>{
    const rows = await Common.dbFetch(User.tableName, { email });
    if(rows?.length){
      return rows[0] as IUser;
    }else{
      return null;
    }
  }

  static async findAll(): Promise<IUserSerialized[]>{
    const rows = await Common.dbFetch(
      User.tableName,
      null,
      [
        'id',
        'firstname',
        'lastname',
        'email',
        'created_at',
      ],
    );
    return rows as IUserSerialized[];
  }

  static async create(user: ICreateUser): Promise<IUserSerialized | null>{
    const insertQuery = await Common.dbInsertion(User.tableName, user);
    if(insertQuery && insertQuery.inserted){
      const newUser = insertQuery.data[0] as IUserSerialized;

      // removing password from the object before serializing it
      newUser.password = undefined;
      return newUser;
    }else{
      return null;
    }
  }
}

export default User;