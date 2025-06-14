import { prisma } from "../../config/db";
import { IRegisterDto } from "./auth.types";

export const registerUser = async (data: IRegisterDto) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};
