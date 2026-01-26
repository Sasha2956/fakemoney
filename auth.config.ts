import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/user";
import { Card, Store } from "@prisma/client";
import { loginSchema } from "./schemas";

export default {
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          cards: {
            include: {
              sentTransactions: true,
              receiveTransactions: true,
            }
          },
          stores: {
            include: {
              transactions: true
            },
          },
        },
      });

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.imageBgColor = existingUser.imageBgColor;
      token.imageTextColor = existingUser.imageTextColor;
      token.stores = existingUser.stores;
      token.cards = existingUser.cards;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.imageBgColor = token.imageBgColor as string;
        session.user.imageTextColor = token.imageTextColor as string;
        session.user.stores = token.stores as Store[];
        session.user.cards = token.cards as Card[];
      }

      return session;
    },
  },
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        const { email, password } = await loginSchema.parseAsync(credentials);
        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password as string,
        );

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
