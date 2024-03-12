import express from 'express';
import { reviewController } from './review.controller';

const router = express.Router();

router.post('/create-reviews', reviewController.createReview);
router.get('/best', reviewController.bestCourseWithReview);

export const reviewRouter = router;
