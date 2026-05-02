import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // الاتصال باستخدام الرابط السري من ملف .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Securely");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB", error);
    // دي خطوة احترافية: لو الداتا بيز وقعت، نوقع السيرفر كله عشان ميفضلش شغال عالفاضي
    process.exit(1);
  }
};

export default connectDB;
