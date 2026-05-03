// middlewares/validator.middleware.js
import AppError from "../utils/AppError.js";
import httpStatusText from "../utils/httpStatusText.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    // 1. نقوم بتجميع البيانات (ممكن نفلتر الـ query أو params برضه لو محتاجين)
    const dataToValidate = req.body;

    // 2. استخدام safeParse
    const validationResult = schema.safeParse(dataToValidate);

    if (!validationResult.success) {
      // 3. تنظيف رسائل الخطأ
      const errorMessages = validationResult.error.issues
        .map((issue) => issue.message)
        .join(" - ");

      // 4. رمي الخطأ للـ Global Handler وإيقاف الـ Request (مش هننادي next)
      // لاحظ إن الـ throw هنا ممكن تحتاج تتباصي لـ next لو إحنا جوه synchronous middleware，
      // بس الأفضل نستخدم next(new AppError(...)) في الميدلوير العادي عشان Express 5 يمسكها صح لو الدالة مش async
      return next(new AppError(errorMessages, 400, httpStatusText.FAIL));
    }

    // 5. تحديث الـ req.body بالبيانات النظيفة والمفلترة من Zod
    req.body = validationResult.data;

    // 6. كل حاجة تمام، عدي للـ Controller
    next();
  };
};
