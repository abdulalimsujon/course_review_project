import { z } from 'zod';

const createReviewValidation = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string(),
    createdBy: z.string(),
  }),
});

export const reviewValidation = {
  createReviewValidation,
};
