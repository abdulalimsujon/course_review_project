import { z } from 'zod';

const tagValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});
const courseDetails = z.object({
  level: z.string(),
  description: z.string(),
});

const CreateCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidation).optional(),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: courseDetails,
    createdBy: z.string(),
  }),
});

export const courseValidation = {
  CreateCourseValidation,
};
