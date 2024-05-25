import { z } from "zod";

export const registerSchema = z.object({
  displayName: z.string().min(3).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(20, "Password must be atmost 20 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
