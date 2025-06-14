import { Router } from 'express';
import {
  registerController,
  verifyPhoneController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} from './controller';
import { authMiddleware, AuthRequest } from './middleware';

const router = Router();

router.post('/register', registerController);
router.post('/verify-phone', verifyPhoneController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

// Protected route example
router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router; 