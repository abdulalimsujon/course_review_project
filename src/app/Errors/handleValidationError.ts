import mongoose from 'mongoose';
import { TErrorResources } from './interface/error.interface';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorResources: TErrorResources = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorResources,
  };
};

export default handleValidationError;
