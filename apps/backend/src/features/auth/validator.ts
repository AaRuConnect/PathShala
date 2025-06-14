import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  password: z.string().min(8),
});

export const verifyPhoneSchema = z.object({
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  otp: z.string().length(6),
});

export const loginSchema = z.object({
  identifier: z.string(), // username, email, or phonenumber
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
});

export const resetPasswordSchema = z.object({
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  otp: z.string().length(6),
  newPassword: z.string().min(8),
}); 