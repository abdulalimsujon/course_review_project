import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { CategoryService } from './category.service';
import httpStatus from 'http-status';

const createCategory = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await CategoryService.createCategoryIntoDb(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'course is created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategory();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully fetch the category',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
};
