import { Card, Store } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedSession = DefaultSession["user"] & {
  cards: Card[];
  stores: Store[];
  imageBgColor?: string;
  imageTextColor?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedSession;
  }
} 
