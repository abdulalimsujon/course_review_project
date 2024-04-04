import mongoose from 'mongoose';
import {
  TErrorResources,
  TgenericErrorResponse,
} from './interface/error.interface';

const hundleCastErrror = (
  error: mongoose.Error.CastError,
): TgenericErrorResponse => {
  const errorResources: TErrorResources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorResources,
  };
};

export default hundleCastErrror;
