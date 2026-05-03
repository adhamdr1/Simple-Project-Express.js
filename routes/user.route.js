import express from "express";
import { validateRequest } from "../middlewares/validator.middleware.js"; // الـ Middleware الجديد
import { registerSchema, loginSchema } from "../validations/user.schema.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  register,
  login,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", protect, getAllUsers);

router.post("/register", validateRequest(registerSchema), register);

router.post("/login", validateRequest(loginSchema), login);

// router.get("/:id", getCourseById);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
