import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import coursesRouter from "./routes/courses.route.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
