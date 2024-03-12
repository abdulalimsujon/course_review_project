import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validdationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validdationRequest;
