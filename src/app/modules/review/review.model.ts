import { Schema, model } from 'mongoose';
import { TcourseReview } from './review.interface';

const reviewSchema = new Schema<TcourseReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    rating: Number,
    review: String,
  },
  {},
);

export const Review = model<TcourseReview>('Review', reviewSchema);
