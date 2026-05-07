import express from "express";
import { validateRequest } from "../middlewares/validator.middleware.js"; // الـ Middleware الجديد
import { registerSchema, loginSchema } from "../validations/user.schema.js";
import isAuthentication from "../middlewares/authentication.middleware.js";
import isAuthorization from "../middlewares/authorization.middleware.js";
import { userRole } from "../utils/userRoles.js";
import {
  getAllUsers,
  register,
  login,
  updateAvatar,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "../controllers/users.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", isAuthentication, isAuthorization(userRole.ADMIN), getAllUsers);

router.post(
  "/register",
  upload.single("avatar"),
  validateRequest(registerSchema),
  register,
);

router.patch(
  "/upload-avatar",
  isAuthentication, // لازم يكون عامل تسجيل دخول الأول
  upload.single("avatar"), // 💡 Multer بيقف هنا يمسك الصورة يحفظها
  updateAvatar, // الـ Controller اللي هيسيف اسم الصورة في الداتا بيز
);

router.post("/login", validateRequest(loginSchema), login);

// router.get("/:id", getCourseById);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
