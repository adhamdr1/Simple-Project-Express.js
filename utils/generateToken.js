import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // بنشفر الـ ID بتاع اليوزر جوه التوكن، باستخدام المفتاح السري، وبنديله مدة صلاحية (يوم)
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
