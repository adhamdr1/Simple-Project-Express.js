import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";
import { courseSchema } from "../validations/course.schema.js";
import { validateRequest } from "../middlewares/validator.middleware.js";
import isAuthentication from "../middlewares/authentication.middleware.js";
import isAuthorization from "../middlewares/authorization.middleware.js";
import { userRole } from "../utils/userRoles.js";

const router = express.Router();

router
  .get("/", isAuthentication, getAllCourses)
  .post(
    "/",
    isAuthentication,
    isAuthorization(userRole.ADMIN),
    validateRequest(courseSchema),
    createCourse,
  );

router.get("/:id", isAuthentication, getCourseById);

router.patch(
  "/:id",
  isAuthentication,
  isAuthorization(userRole.ADMIN),
  validateRequest(courseSchema.partial()),
  updateCourse,
);

router.delete(
  "/:id",
  isAuthentication,
  isAuthorization(userRole.ADMIN),
  deleteCourse,
);

export default router;
