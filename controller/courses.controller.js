import { courseSchema } from "../validation.js";
import { courses } from "../data.js";

export const getCourses = (req, res) => {
  res.json(courses);
};

export const getCourseById = (req, res) => {
  const courseId = +req.params.id;
  console.log(req.params);
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export const createCourse = (req, res) => {
  console.log(req.body);
  const validatedCourse = courseSchema.parse(req.body);

  if (!validatedCourse) {
    return res.status(400).json({ message: "Invalid course data" });
  }

  courses.push({ id: courses.length + 1, ...validatedCourse });

  res.status(201).json(courses);
};

export const updateCourse = (req, res) => {
  const validatedCourse = courseSchema.parse(req.params);

  if (!validatedCourse) {
    return res.status(400).json({ message: "Invalid course data" });
  }

  const courseId = +req.params.id;
  let course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  course = { ...course, ...req.body };

  res.json(course);
};

export const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses.splice(courses.indexOf(course), 1);
  res.json({ message: "Course deleted" });
};
