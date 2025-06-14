import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from './utils/hash';
import { generateOTP, generateOTPExpiry, isOTPExpired, sendSMS } from './utils/otp';
import { generateAccessToken, generateRefreshToken } from './utils/jwt';

const prisma = new PrismaClient();

export const register = async (username: string, phonenumber: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  const otp = generateOTP();
  const expiresAt = generateOTPExpiry();

  const user = await prisma.user.create({
    data: {
      username,
      phonenumber,
      email: `${username}@pathshala.com`,
      password_hash: hashedPassword,
      verifications: {
        create: {
          otp,
          expires_at: expiresAt,
        },
      },
    },
  });

  await sendSMS(phonenumber, otp);

  return user;
};

export const verifyPhone = async (phonenumber: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: { phonenumber },
    include: { verifications: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const verification = user.verifications[0];
  if (!verification || verification.is_used || isOTPExpired(verification.expires_at)) {
    throw new Error('Invalid or expired OTP');
  }

  if (verification.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { is_verified: true },
    }),
    prisma.phoneVerification.update({
      where: { id: verification.id },
      data: { is_used: true },
    }),
  ]);

  return true;
};

export const login = async (identifier: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier },
        { email: identifier },
        { phonenumber: identifier },
      ],
    },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await comparePassword(password, user.password_hash);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      is_verified: user.is_verified,
    },
  };
};

export const forgotPassword = async (phonenumber: string) => {
  const user = await prisma.user.findUnique({
    where: { phonenumber },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const otp = generateOTP();
  const expiresAt = generateOTPExpiry();

  await prisma.phoneVerification.create({
    data: {
      user_id: user.id,
      otp,
      expires_at: expiresAt,
    },
  });

  await sendSMS(phonenumber, otp);
  return true;
};

export const resetPassword = async (
  phonenumber: string,
  otp: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { phonenumber },
    include: { verifications: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const verification = user.verifications[0];
  if (!verification || verification.is_used || isOTPExpired(verification.expires_at)) {
    throw new Error('Invalid or expired OTP');
  }

  if (verification.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password_hash: hashedPassword },
    }),
    prisma.phoneVerification.update({
      where: { id: verification.id },
      data: { is_used: true },
    }),
  ]);

  return true;
}; 