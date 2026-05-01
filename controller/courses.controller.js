import { courseSchema } from "../validation.js";
// import { courses } from "../data.js";
import Course from "../models/course.model.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      return res.json(course);
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid course ID" });
  }
};

export const createCourse = async (req, res) => {
  try {
    console.log(req.body);
    const validatedCourse = courseSchema.parse(req.body);

    if (!validatedCourse) {
      return res.status(400).json({ message: "Invalid course data" });
    }

    const newCourse = new Course(req.body);
    await newCourse.save();
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true },
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Error updating course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting course" });
  }
};
