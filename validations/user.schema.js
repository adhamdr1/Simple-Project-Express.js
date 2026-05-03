import { z } from "zod";

// Schema خاص بالتسجيل
export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

// Schema خاص بالدخول (مش محتاجين الاسم هنا)
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), // مجرد التأكد إنه مش فاضي
});
