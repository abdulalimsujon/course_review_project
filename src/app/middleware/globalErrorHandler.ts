/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorResources } from '../Errors/interface/error.interface';
import config from '../config';
import { handleZodError } from '../Errors/HandleZodError';
import handleValidationError from '../Errors/handleValidationError';
import hundleCastErrror from '../Errors/handleCastError';
import handleDuplicateError from '../Errors/handleDuplicateError';
import AppError from '../Errors/AppError';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = error.message || 'something went wrong';
  const statusCode = 400;

  let errorSource: TErrorResources = [
    {
      path: ' ',
      message: 'something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorResources;
  } else if (error.name === 'CastError') {
    const simplifiedError = hundleCastErrror(error);

    message = simplifiedError.message;
    errorSource = simplifiedError.errorResources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorResources;
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [{ path: ' ', message: error.message }];
  } else if (error instanceof AppError) {
    message = error.message;
    errorSource = [{ path: ' ', message: error.message }];
  }

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message: message,
    // error,
    errorSource,
    stack: config.node_dev === 'development' ? error?.stack : null,
  });
};

export default errorHandler;
