// middlewares/authentication.middleware.js
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import httpStatusText from "../utils/httpStatusText.js";
import User from "../models/user.model.js";

// دالة الحماية (Guard)
export const isAuthentication = async (req, res, next) => {
  // 1. جلب التوكن من الـ Headers والتأكد من وجود كلمة Bearer
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // بنفصل كلمة Bearer عن التوكن نفسه وناخد التوكن (العنصر رقم 1 في المصفوفة)
    token = req.headers.authorization.split(" ")[1];
  }

  // لو مفيش توكن مبعوت أصلاً
  if (!token) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401,
      httpStatusText.UNAUTHORIZED,
    );
  }

  try {
    // 2. فك تشفير التوكن والتأكد من صلاحيته (باستخدام نفس الـ Secret Key)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. 💡 (Best Practice) التأكد إن اليوزر صاحب التوكن لسة موجود في الداتا بيز
    // (عشان لو الأدمن مسح حساب اليوزر، التوكن القديم بتاعه ميشتغلش)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new AppError(
        "The user belonging to this token no longer exists.",
        401,
        httpStatusText.UNAUTHORIZED,
      );
    }

    // 4. إرفاق بيانات اليوزر بالريكويست عشان الكنترولر يقدر يستخدمها
    req.user = currentUser;

    // 5. السماح بالمرور للـ Controller
    next();
  } catch (error) {
    // لو التوكن منتهي (Expired) أو ملعوب فيه (Invalid Signature)
    throw new AppError(
      "Invalid or expired token, please log in again.",
      401,
      httpStatusText.UNAUTHORIZED,
    );
  }
};

export default isAuthentication;
