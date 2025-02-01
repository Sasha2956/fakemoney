"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";
import { loginSchema, registerSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>): Promise<string | undefined> => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return "Invalid fields";
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return "User not found";
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    console.error(`⨯ Error logging in user: \n ${error}`);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password";
        default:
          return "Something went wrong";
      }
    }

    return "Something went wrong";
  }
}