import { User } from "@prisma/client";
import prisma from "./prisma";

export const getUserByEmail = async (email: string): Promise<User | undefined | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    return user;
  } catch (error) {
    console.error(`⨯ Error fetching user by email: \n ${error}`);
    throw error;
  }
};
