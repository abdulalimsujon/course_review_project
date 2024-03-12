import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await reviewService.createReviewIntoDb(body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully created the review',
    data: result,
  });
});

const bestCourseWithReview = catchAsync(async (req, res) => {
  const result = await reviewService.bestCourseAccordingToReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully get the best',
    data: result,
  });
});

export const reviewController = {
  createReview,
  bestCourseWithReview,
};
