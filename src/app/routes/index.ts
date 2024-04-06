import express from 'express';
import { CategoryRoute } from '../modules/category/category.route';
import { courseRouter } from '../modules/course/course.route';
import { reviewRouter } from '../modules/review/review.routes';
import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '../modules/auth/auth.routes';

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
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/auth',
    route: authRoute,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
