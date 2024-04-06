import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';

import { authServices } from './auth.services';
import { JwtPayload } from 'jsonwebtoken';

const userLogin = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await authServices.userLogin(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course successfully logged In',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  await authServices.passwordChange(passwordData, req.user as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password  is updated in successfully',
    data: null,
  });
});

export const authController = {
  userLogin,
  changePassword,
};
