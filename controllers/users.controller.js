import User from "../models/user.model.js";
import httpStatusText from "../utils/httpStatusText.js";
import AppError from "../utils/AppError.js";
import generateToken from "../utils/generateToken.js";

export const getAllUsers = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: 0, password: 0, updatedAt: 0 })
    .skip(skip)
    .limit(parseInt(limit));

  return res.json({ status: httpStatusText.SUCCESS, data: { users } });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400, httpStatusText.FAIL);
  }

  const newUser = await User.create(req.body);

  // 3. إصدار التوكن
  const token = generateToken(newUser._id);

  // 4. إخفاء الباسوورد من الـ Response النهائي (أمان)
  newUser.password = undefined;

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { newUser, token } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401, httpStatusText.FAIL);
  }

  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401, httpStatusText.FAIL); // رسالة الخطأ موحدة عشان الهاكرز ميعرفوش إيه اللي غلط بالظبط
  }

  // 3. إصدار التوكن
  const token = generateToken(user._id);

  // 4. إخفاء الباسوورد قبل الإرسال
  user.password = undefined;

  return res.json({
    status: httpStatusText.SUCCESS,
    data: { user, token },
  });
};

// export const getUserById = async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     throw new AppError("User not found", 404, httpStatusText.FAIL);
//   }
//   return res.json({ status: httpStatusText.SUCCESS, data: { user } });
// };

// export const updateUser = async (req, res) => {
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     { returnDocument: "after" }, // عشان يرجعلك اليوزر بعد التعديل
//   );

//   if (!user) {
//     throw new AppError("User not found", 404, httpStatusText.FAIL);
//   }
//   return res
//     .status(200)
//     .json({ status: httpStatusText.SUCCESS, data: { user } });
// };

// export const deleteUser = async (req, res, next) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   if (!user) {
//     throw new AppError("User not found", 404, httpStatusText.FAIL);
//   }

//   // في الـ Delete الـ Data دايماً بتكون null
//   return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
// };
