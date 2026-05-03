import Course from "../models/course.model.js";
import httpStatusText from "../utils/httpStatusText.js";
import AppError from "../utils/AppError.js";

export const getAllCourses = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: 0 })
    .skip(skip)
    .limit(parseInt(limit));

  return res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new AppError("Course not found", 404, httpStatusText.FAIL);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
};

export const createCourse = async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  return res
    .status(201)
    .json({ status: httpStatusText.CREATED, data: { newCourse } });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { returnDocument: "after" }, // عشان يرجعلك الكورس بعد التعديل
  );

  if (!course) {
    throw new AppError("Course not found", 404, httpStatusText.FAIL);
  }
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { course } });
};

export const deleteCourse = async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    throw new AppError("Course not found", 404, httpStatusText.FAIL);
  }

  // في الـ Delete الـ Data دايماً بتكون null
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};
