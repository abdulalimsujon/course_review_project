import { z } from 'zod';

const CreateCategoryValiddationSchema = z.object({
  body: z.object({
    name: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CategoryValiddation = {
  CreateCategoryValiddationSchema,
};
