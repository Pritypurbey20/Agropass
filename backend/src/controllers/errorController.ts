import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import catchAsync from './../utils/catchAsync';
import { constVariable } from '../utils/const';
import { en }  from '../utils/en-in';
const AppError = require('./../utils/appError');
import { msg } from '../server';

const handleCastErrorDB = (err: any) => {
  const message = `${msg.controllers.error.invalid} ${err.path}: ${err.value}.`;
  return new AppError(message, constVariable.HTTP.BADREQUEST);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `${msg.controllers.error.duplicateField1}: ${value}. ${msg.controllers.error.duplicateField2}`;
  return new AppError(message, constVariable.HTTP.BADREQUEST);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `${msg.controllers.error.invalidInput}. ${errors.join('. ')}`;
  return new AppError(message, constVariable.HTTP.BADREQUEST);
};

const handleJWTError = () => new AppError(msg.controllers.error.invalidToken, constVariable.HTTP.BADREQUEST);

const handleJWTExpiredError = () => new AppError(msg.controllers.error.tokenExpired, constVariable.HTTP.BADREQUEST);

const sendErrorDev = (err: any, req: Request, res: any) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {

    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  logger.error('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: msg.controllers.error.someThingWentWrong,
    msg: err.message,
  });
};

const sendErrorProd = (err: any, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    logger.error('ERROR', err);
    // 2) Send generic message
    return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({ message: msg.controllers.error.someThingWentWrong });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render(msg.controllers.error.error, {
      title: msg.controllers.error.someThingWentWrong,
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  logger.error('ERROR', err);
  // 2) Send generic message
  return res.status(err.statusCode).render(msg.controllers.error.error, {
    title: msg.controllers.error.someThingWentWrong,
    msg: msg.controllers.error.tryAgainLater,
  });
};

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  const status: number = err.status || constVariable.HTTP.FORBIDDEN;
  const message: string = err.message || msg.controllers.error.someThingWentWrong;
  err.statusCode = err.statusCode || constVariable.HTTP.FORBIDDEN;
  err.status = err.status || msg.controllers.error.error;

  if (process.env.NODE_ENV === constVariable.GLOBALERRORHANDLER.DEVELOPMENT) {
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === constVariable.GLOBALERRORHANDLER.PRODUCTION) {
    let error = { ...err };
    error.message = err.message;

    if (error.name === constVariable.GLOBALERRORHANDLER.CASTERROR) error = handleCastErrorDB(error);
    if (error.code === constVariable.GLOBALERRORHANDLER.MONGODUPLICATEKEY) error = handleDuplicateFieldsDB(error);
    if (error.name === constVariable.GLOBALERRORHANDLER.VALIDATIONERROR) error = handleValidationErrorDB(error);
    if (error.name === constVariable.GLOBALERRORHANDLER.JSONWEBTOKENERROR) error = handleJWTError();
    if (error.name === constVariable.GLOBALERRORHANDLER.TOKENEXPIREDERROR) error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  } else {
    res.send({ message: en.controllers.error.emptyNodeEnv });
  }
};
