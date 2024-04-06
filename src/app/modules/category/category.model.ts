import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: [20, 'max length 20 charaters'],
      validate: {
        validator: function (value: string) {
          const name = value.charAt(0).toUpperCase() + value.slice(1);

          return name === value;
        },
        message: 'Category must be start with Uppercase',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  },
);

export const Category = model<TCategory>('Category', CategorySchema);
