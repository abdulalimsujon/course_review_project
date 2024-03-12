import { ZodError, ZodIssue } from 'zod';
import {
  TErrorResources,
  TgenericErrorResponse,
} from './interface/error.interface';

const handleZodError = (err: ZodError): TgenericErrorResponse => {
  const errorSources: TErrorResources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorResources: errorSources,
  };
};

export default handleZodError;
