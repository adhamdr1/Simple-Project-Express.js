import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";
import { courseSchema } from "../validations/course.schema.js";
import { validateRequest } from "../middlewares/validator.middleware.js"; // الـ Middleware الجديد
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .get("/", protect, getAllCourses)
  .post("/", protect, validateRequest(courseSchema), createCourse);

router.get("/:id", protect, getCourseById);

router.patch(
  "/:id",
  protect,
  validateRequest(courseSchema.partial()),
  updateCourse,
);

router.delete("/:id", protect, deleteCourse);

export default router;
