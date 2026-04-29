import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courses.controller.js";

const router = express.Router();

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.post("/", createCourse);

router.patch("/:id", updateCourse);

router.delete("/:id", deleteCourse);

export default router;
