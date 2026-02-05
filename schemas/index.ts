import z from "zod";

export const registerSchema = z.object({
  username: z.string({ message: "Username is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z.string({ message: "Password is required" }).min(6).max(50),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z.string({ message: "Password is required" }).min(6).max(50),
});

export const createStoreSchema = z.object({
  name: z.string({ message: "Name is required" }).min(6, { message: "Name must have at least 6 characters"}),
});
