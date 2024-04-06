/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync';
import AppError from '../Errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

// Extend the express Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const Auth = (...RequireRules: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    //if  the token is invalid

    const decode = jwt.verify(
      token,
      config.jsonAccessToken as string,
    ) as JwtPayload;

    req.user = decode as JwtPayload;

    console.log(decode);

    const { role, userId } = decode.Payload;

    console.log(role, userId);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user is not found');
    }

    if (RequireRules && !RequireRules.includes(role as TUserRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize');
    }

    next();
  });
};

export default Auth;
