/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorResources,
  TgenericErrorResponse,
} from './interface/error.interface';

const handleDuplicateError = (error: any): TgenericErrorResponse => {
  const text = error?.message;

  const regex = /"(.*?)"/g;

  const matches = text ? text.match(regex) : null;

  let message: string | undefined;
  if (matches) {
    message = matches
      .map((match: string) => match.replace(/"/g, ''))
      .join(', ');
  }

  const errorResources: TErrorResources = [
    {
      path: error.path,
      message: message || error.message, // Fallback to error.message if message is not defined
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorResources,
  };
};

export default handleDuplicateError;
