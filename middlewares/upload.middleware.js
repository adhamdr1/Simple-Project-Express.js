import multer from "multer";
import AppError from "../utils/AppError.js";
import httpStatusText from "../utils/httpStatusText.js";

// 1. تحديد مكان الحفظ (Destination) واسم الملف (Filename)
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb (Callback function): البارامتر الأول للإيرور (null لو مفيش)، والتاني للمسار
    cb(null, "uploads/"); // تأكد إنك عامل فولدر اسمه uploads في المشروع من بره
  },
  filename: function (req, file, cb) {
    // Best Practice: بنغير اسم الصورة ونحط فيه التاريخ عشان لو يوزر رفع صورة بنفس الاسم ماتعملش Overwrite للتانية
    const ext = file.mimetype.split("/")[1]; // استخراج الامتداد (jpeg, png)
    const uniqueFileName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    cb(null, uniqueFileName);
  },
});

// 2. الحماية (File Filter): التأكد إن المرفوع صورة بس مش ملف هاكر
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // الصورة تمام، اقبلها
  } else {
    cb(
      new AppError(
        "Not an image! Please upload only images.",
        400,
        httpStatusText.FAIL,
      ),
      false,
    ); // ارفض الملف وارمي إيرور
  }
};

// 3. إنشاء الـ Middleware النهائي
const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // حماية إضافية: أقصى حجم للصورة 2 ميجابايت عشان السيرفر ميتخنقش
  },
});

export default upload;
