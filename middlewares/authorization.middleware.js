import AppError from "../utils/AppError.js";
import httpStatusText from "../utils/httpStatusText.js";
const isAuthorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    // req.user موجودة بالفعل لأن دالة protect اشتغلت قبل دي وحطت اليوزر في الريكويست

    // هل الرول بتاع اليوزر الحالي موجود جوه مصفوفة الرولز المسموح بيها？
    if (!userRole || !roles.includes(userRole)) {
      // 💡 لاحظ: بنرجع 403 Forbidden وليس 401.
      // 403 معناها "أنا عارف إنت مين، بس إنت ممنوع تدخل هنا".
      return next(
        new AppError(
          "You do not have permission to perform this action",
          403,
          httpStatusText.FORBIDDEN, // تأكد إن FORBIDDEN متعرفة عندك في ملف الثوابت
        ),
      );
    }

    // لو معاه الصلاحية، عدي للـ Controller
    next();
  };
};

export default isAuthorization;
