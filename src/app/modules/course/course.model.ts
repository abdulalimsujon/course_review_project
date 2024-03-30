import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';
import { getDurationInWeeks } from '../../utilities/DateValidation';
import { Category } from '../category/category.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const courseSchema = new Schema<TCourse>(
  {
    title: String,
    instructor: {
      type: String,
      unique: true,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
    price: Number,
    tags: [],
    startDate: String,
    endDate: String,
    language: String,
    provider: String,
    details: {},
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//---------------------set the virtual--------------------------------

courseSchema.virtual('durationInWeeks').get(function () {
  const getWeeks = getDurationInWeeks(this.startDate, this.endDate);

  return getWeeks;
});

//--------------------find the courseBefore the set ------------------

courseSchema.pre('save', async function () {
  const result = await Category.findOne({ _id: this.categoryId });
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Donot have this type of Category',
    );
  }
});

export const Course = model<TCourse>('course', courseSchema);
