import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("Missing MONGO_URI");
  await mongoose.connect(uri, { dbName: "tsmern" });
  console.log("MongoDB connected");
}
