import { addMinutes } from 'date-fns';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const twilioClient = twilio(accountSid, authToken);

// Generate a 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate OTP expiry time (10 minutes from now)
export const generateOTPExpiry = (minutes: number = 10): Date => {
  return addMinutes(new Date(), minutes);
};

// Check if OTP has expired
export const isOTPExpired = (expiryDate: Date): boolean => {
  return new Date() > expiryDate;
};

// Real SMS sending function using Twilio
export const sendSMS = async (phoneNumber: string, otp: string): Promise<void> => {
  const message = `Your PathShala verification code is: ${otp}. Valid for 10 minutes.`;
  await twilioClient.messages.create({
    body: message,
    to: phoneNumber,
    from: twilioPhone,
  });
}; 