import bcrypt from 'bcryptjs';

export class Password {

  static async toHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }

}