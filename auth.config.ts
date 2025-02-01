import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/user";

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        const user = await getUserByEmail(credentials.email);

        if (!user) {
          return;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsMatch) {
          return;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
