import express from 'express';
import { categoryController } from './category.controller';
import validdationRequest from '../../middleware/ValiddationRequest';
import { CategoryValiddation } from './category.validdation';

const router = express.Router();

router.post(
  '/create-categories',
  validdationRequest(CategoryValiddation.CreateCategoryValiddationSchema),
  categoryController.createCategory,
);

router.get('/all-categories', categoryController.getAllCategory);

export const CategoryRoute = router;
