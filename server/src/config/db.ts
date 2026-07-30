import mongoose from "mongoose";
import { env } from "./env";

const DB = env.DATABASE_URL?.replace("<PASSWORD>", env.DATABASE_PASSWORD || "");
export const connectDB = async () => {
  try {
    await mongoose.connect(DB);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed");

    console.error(error);

    process.exit(1);
  }
};
