import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),

  price: z.number().positive({ message: "Price must be a positive number" }),
});
