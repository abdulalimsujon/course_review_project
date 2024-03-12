import { Types } from 'mongoose';

export type TcourseReview = {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
};
