import { Router } from 'express';
import { AuthController } from './controller';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/verify-phone', AuthController.verifyPhone);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router; 