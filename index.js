import express from "express";
import coursesRouter from "./routes/courses.route.js";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
