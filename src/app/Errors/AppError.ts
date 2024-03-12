class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    //AppError class. It accepts three parameters:
    super(message);
    //This calls the constructor of the Error class and sets the error message.
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    // This conditional block checks if the stack parameter is provided. If it is, it sets the stack property of the AppError
    // object to the provided stack trace. Otherwise, it captures the stack trace using Error.captureStackTrace().
  }
}

export default AppError;
