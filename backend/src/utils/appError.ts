export class AppError extends Error {
  public statusCode: any;
  public status: string;
  public isOperational: boolean;
  constructor(message: any, statusCode: any) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
