import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './user.service';

const userRegistration = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.userRegistration(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'user is created successfully',
    data: result,
  });
});

export const userController = {
  userRegistration,
};
