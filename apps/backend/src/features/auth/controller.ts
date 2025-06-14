import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  register,
  verifyPhone,
  login,
  forgotPassword,
  resetPassword,
} from './service';
import {
  registerSchema,
  verifyPhoneSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './validator';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phonenumber, password } = registerSchema.parse(req.body);
    const user = await register(username, phonenumber, password);
    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const verifyPhoneController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phonenumber, otp } = verifyPhoneSchema.parse(req.body);
    await verifyPhone(phonenumber, otp);
    res.json({ message: 'Phone number verified successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identifier, password } = loginSchema.parse(req.body);
    const result = await login(identifier, password);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phonenumber } = forgotPasswordSchema.parse(req.body);
    await forgotPassword(phonenumber);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phonenumber, otp, newPassword } = resetPasswordSchema.parse(req.body);
    await resetPassword(phonenumber, otp, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
}; 