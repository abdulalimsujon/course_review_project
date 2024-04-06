import express from 'express';
import { courseController } from './course.controller';
import validdationRequest from '../../middleware/ValiddationRequest';
import { courseValidation } from './course.validation';
import Auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  Auth('admin'),
  validdationRequest(courseValidation.CreateCourseValidation),
  courseController.CreateCourse,
);
router.put(
  '/update-course/:id',
  //   validdationRequest(courseValidation.CreateCourseValidation),
  courseController.updateCourse,
);
router.get(
  '/search-course/:id',
  //   validdationRequest(courseValidation.CreateCourseValidation),
  courseController.searchById,
);
router.get('/best', courseController.bestCourseWithReview);
router.get('/get-courses', courseController.getCourses);

export const courseRouter = router;
