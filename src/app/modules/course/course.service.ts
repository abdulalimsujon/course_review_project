import { Types } from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: TCourse) => {
  const isExistCourse = await Course.findOne({
    instructor: payload.instructor,
  });
  if (isExistCourse) {
    throw new Error('agfdskj');
  }

  const result = await Course.create(payload);

  return result;
};

const getCoursesFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = '';

  const queryObject = { ...query };
  const excludedFields = [
    'searchTerm',
    'skip',
    'limit',
    'sort',
    'page',
    'fields',
  ];

  excludedFields.forEach((ele) => delete queryObject[ele]);

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Course.find({
    $or: ['language', 'provider', 'title'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery.find(queryObject);

  let sort = '-createdAt';

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);
  let limit = 2;
  let skip = 0;
  let page = 1;

  if (query?.limit) {
    limit = query.limit as number;
    skip = (page - 1) * limit;
  }

  if (query?.page) {
    page = query.page as number;
  }

  const limitQuery = sortQuery.limit(limit);

  const skipQuery = limitQuery.skip(skip);

  let fields = ' ';
  if (query?.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const result = await skipQuery.select(fields);

  return result;
};
const updateStudentFromDb = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedUpdatedData[`tags.${key}`] = value;
    }
  }

  if (details && Object.keys(details)) {
    for (const [key, value] of Object.entries(details))
      modifiedUpdatedData[`details.${key}`] = value;
  }

  const result = await Course.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const getCourseById = async (id: string) => {
  const result = await Course.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id), // Match condition for _id
      },
    },
    {
      $lookup: {
        from: 'reviews', // Name of the collection to join
        localField: '_id', // Field from the Course collection
        foreignField: 'courseId', // Field from the Review collection
        as: 'reviews', // Name of the field to store the joined documents
      },
    },
  ]);

  return result; // Assuming there's only one result, return the first element
};
const bestCourseAccordingToReview = async () => {
  const result = await Course.find({});
  return result;
};

export const courseService = {
  createCourseIntoDb,
  updateStudentFromDb,
  getCourseById,
  bestCourseAccordingToReview,
  getCoursesFromDb,
};
