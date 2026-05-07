import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { userRole } from "../utils/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true, // بيمسح المسافات الزايدة في الأول والآخر
      maxLength: [50, "First name is too long"], // Best Practice
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxLength: [50, "Last name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Indexing not a validator
      lowercase: true, // بيحول أي إيميل لسمول عشان الـ Login ميبُظش
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"], // استخدام المكتبة
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // عشان لما تجيب اليوزر ما يجيبش الباسورد
      validate: [
        function (value) {
          // استخدام دالة المكتبة الجاهزة مع تحديد الشروط المطلوبة
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ],
    },
    role: {
      type: String,
      enum: [userRole.ADMIN, userRole.STUDENT, userRole.TEACHER],
      default: userRole.STUDENT,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: "uploads/legend.jpg",
    },
  },
  {
    timestamps: true,
  },
);

// 1. Mongoose Middleware (Hook) لتشفير الباسوورد أوتوماتيك قبل الحفظ
userSchema.pre("save", async function () {
  // لو الباسوورد ماتعدلش (مثلاً اليوزر بيحدث اسمه بس)، متعملش حاجة وعدي للخطوة اللي بعدها
  if (!this.isModified("password")) return;

  // تشفير الباسوورد برقم 12 (قوة التشفير - Cost Factor)
  this.password = await bcrypt.hash(this.password, 12);
});

// 2. Instance Method لمقارنة الباسوورد وقت الـ Login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
