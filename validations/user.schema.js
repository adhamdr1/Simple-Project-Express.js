import { z } from "zod";

// Schema خاص بالتسجيل
export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z
    .string() // 1. استلم النص
    .toLowerCase() // 2. حول أي حرف كابيتال لسمول أوتوماتيك (AdMin -> admin)
    .pipe(z.enum(["admin", "student", "teacher"])) // 3. دخله على الـ enum يتأكد منه
    .optional(),
});

// Schema خاص بالدخول (مش محتاجين الاسم هنا)
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), // مجرد التأكد إنه مش فاضي
});
