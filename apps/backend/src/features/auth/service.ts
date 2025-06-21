import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import { SignupInput, LoginInput, VerifyEmailInput, VerifyPhoneInput } from './schemas';
import { Role } from '@prisma/client';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../utils/email';

export class AuthService {
  private static generateToken(userId: string, role: Role): string {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  }

  private static generateEmailVerificationToken(userId: string): string {
    return jwt.sign({ userId }, process.env.EMAIL_SECRET!, { expiresIn: '10m' });
  }

  static async signup(data: SignupInput) {
    const { email, password, role, name, phone, address } = data;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        userInfo: {
          create: {
            name,
            phone,
            address,
          },
        },
      },
      include: {
        userInfo: true,
      },
    });

    const token = this.generateToken(user.id, user.role);
    const verificationToken = this.generateEmailVerificationToken(user.id);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendVerificationEmail(email, verificationToken);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.userInfo?.name,
      },
      token,
    };
  }

  static async login(data: LoginInput) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { userInfo: true },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    if (!user.emailVerified) {
      const verificationToken = this.generateEmailVerificationToken(user.id);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationToken,
          verificationTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      await sendVerificationEmail(user.email, verificationToken);
      throw new Error('Please verify your email first. A new verification email has been sent.');
    }

    const token = this.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.userInfo?.name,
      },
      token,
    };
  }

  static async verifyEmail(data: VerifyEmailInput) {
    const { token } = data;
    try {
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET!) as { userId: string };

      const user = await prisma.user.findFirst({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.emailVerified) {
        return {
          success: true,
          message: 'Email already verified',
          user: {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
          }
        };
      }

      if (
        user.verificationToken !== token ||
        !user.verificationTokenExpires ||
        user.verificationTokenExpires < new Date()
      ) {
        throw new Error('Invalid or expired verification token');
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          verificationToken: null,
          verificationTokenExpires: null,
        },
      });

      return {
        success: true,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          emailVerified: updatedUser.emailVerified,
        }
      };
    } catch (error) {
      throw new Error('Invalid or expired verification token');
    }
  }

  static async verifyPhone(data: VerifyPhoneInput) {
    const { phone, otp } = data;
    
    const user = await prisma.user.findFirst({
      where: {
        userInfo: {
          phone,
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // In a real application, verify OTP here
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { phoneVerified: true },
    });

    return { success: true, user: updatedUser };
  }

  static async forgotPassword(email: string) {
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const resetToken = jwt.sign({ userId: user.id }, process.env.EMAIL_SECRET!, { expiresIn: '10m' });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: resetToken,
          resetPasswordTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      await sendPasswordResetEmail(email, resetToken);
    }
    return { success: true, message: 'If that email is registered, a password reset link has been sent.' };
  }

  static async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET!) as { userId: string };
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user || !user.resetPasswordToken || !user.resetPasswordTokenExpires) {
        throw new Error('Invalid or expired reset token');
      }
      if (
        user.resetPasswordToken !== token ||
        user.resetPasswordTokenExpires < new Date()
      ) {
        throw new Error('Invalid or expired reset token');
      }
      const hashedPassword = await hash(newPassword, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordTokenExpires: null,
        },
      });
      return { success: true, message: 'Password has been reset successfully.' };
    } catch (error) {
      throw new Error('Invalid or expired reset token');
    }
  }
} 