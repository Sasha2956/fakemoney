"use server"

import { registerSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { signIn } from "@/auth"
import randomColor from "randomcolor"

export const register = async (values: z.infer<typeof registerSchema>): Promise<string | undefined> => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return "Invalid fields"
  }

  const { username, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
        imageBgColor: randomColor({ luminosity: "light" }),
      }
    });
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error(`⨯ Error registering user: \n ${error}`)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return "Email already exists";
      }
    }

    return "Something went wrong"
  }
}