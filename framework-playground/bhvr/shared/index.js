import z from "zod";

export const VERSION = "1.0.0-PROTOTYPE";
export const API_URL = "http://localhost:3000";

export const RegistrationSchema = z
  .object({
    email: z.email(),
    name: z.string().min(2).max(30),
    password: z.string().min(8).max(120),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(120),
});
