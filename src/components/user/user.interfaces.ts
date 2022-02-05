export interface ICreateUser{
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface IUser {
  id: number,
  firstname: string,
  lastname: string,
  password: string,
  email: string,
  created_at: string,
}

export interface IUserSerialized {
  id: number,
  firstname: string,
  lastname: string,
  password?: string,
  email: string,
  created_at: string,
}