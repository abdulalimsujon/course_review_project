import express from 'express';
import { authController } from './auth.controller';
import Auth from '../../middleware/auth';

const router = express.Router();

router.post('/login', authController.userLogin);
router.post('/change-password', Auth('admin'), authController.changePassword);

export const authRoute = router;
