import httpStatus from 'http-status';
import { Tlogin } from '../auth/auth.interface';
import AppError from '../../Errors/AppError';
import bcrypt from 'bcrypt';
import config from '../../config';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { comparePassword, createToken } from './auth.utils';

const userLogin = async (payload: Tlogin) => {
  const result = await User.findOne({ username: payload.username });
  const passwordMatch = await comparePassword(
    payload.password,
    result?.password as string,
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password dont matched');
  }

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'user is not found');
  }

  const Payload = {
    userId: result._id, // Convert ObjectId to string

    role: result.role, // Provide a default value for role if it's undefined
  };
  const token = createToken(Payload, config.jsonAccessToken as string, '7d');

  return { data: result, token };
};

const passwordChange = async (
  payload: { oldPassword: string; newPassword: string },
  userData: JwtPayload,
) => {
  const isUserExists = await User.findOne({ _id: userData.Payload.userId });

  const matchPassword = await comparePassword(
    payload.oldPassword as string,
    isUserExists?.password as string,
  );

  if (matchPassword) {
    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
    await User.findOneAndUpdate(
      {
        _id: userData.Payload.userId,
        role: userData.Payload.role,
      },
      {
        password: hashedPassword,
      },
    );
  }
};

export const authServices = {
  userLogin,
  passwordChange,
};
