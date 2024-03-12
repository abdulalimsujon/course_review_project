/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Course } from '../course/course.model';
import { TcourseReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDb = async (payload: TcourseReview) => {
  const result = await Review.create(payload);
  return result;
};
const bestCourseAccordingToReview = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: '$courseId', // Group by the name field
        reviewCount: { $sum: '$rating' },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);

  const course = await Course.findOne({ _id: result[0]._id }, { _id: 0 });

  const { _id, ...ttt } = result[0];

  return { course, ...ttt };
};

export const reviewService = {
  createReviewIntoDb,
  bestCourseAccordingToReview,
};
