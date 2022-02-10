export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message?: string) {
    super(message);

    // restore prototype chain
    const actualProto = new.target.prototype;

    // This makes sure that any objects created by the custom error constructor
    //  gets the Error Object in its prototype chain
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
