import express from 'express';
import { CategoryRoute } from '../modules/category/category.route';
import { courseRouter } from '../modules/course/course.route';
import { reviewRouter } from '../modules/review/review.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/courses',
    route: courseRouter,
  },
  {
    path: '/reviews',
    route: reviewRouter,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
