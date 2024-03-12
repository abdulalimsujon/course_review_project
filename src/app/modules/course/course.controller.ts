import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { courseService } from './course.service';

const CreateCourse = catchAsync(async (req, res) => {
  const body = req.body;

  const result = await courseService.createCourseIntoDb(body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course successfully created',
    data: result,
  });
});
const getCourses = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await courseService.getCoursesFromDb(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await courseService.updateStudentFromDb(id, body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

const searchById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseService.getCourseById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'course is feteched successfully',
    data: result,
  });
});
const bestCourseWithReview = catchAsync(async (req, res) => {
  const result = await courseService.bestCourseAccordingToReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully get the best course',
    data: result,
  });
});

export const courseController = {
  CreateCourse,
  updateCourse,
  searchById,
  bestCourseWithReview,
  getCourses,
};
