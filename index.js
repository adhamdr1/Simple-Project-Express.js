import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import httpStatusText from "./utils/httpStatusText.js";
import coursesRouter from "./routes/course.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Security & Body Parsing
app.use(cors());
app.use(express.json());

// 3. Application Routes
app.use("/api/courses", coursesRouter);
app.use("/api/users", userRouter);

// 4. Global 404 Handler (بتشتغل لو اليوزر طلب Route مش موجود)
app.use((req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.NOT_FOUND,
    message: "Requested resource was not available on this server",
  });
});

// 5. Global Error Handler (🔥 هنا بتيجي الأخطاء اللي رميناها بـ AppError 🔥)
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusText = error.statusText || httpStatusText.ERROR;

  return res.status(statusCode).json({
    status: statusText,
    message: error.message,
    code: statusCode,
    data: null,
  });
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
