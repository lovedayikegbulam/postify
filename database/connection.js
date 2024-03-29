import mongoose from "mongoose";
import CONFIG from "../config/config.js";

const connectToDb = async () => {
  const MONGODB_URI  = CONFIG.MONGODB_URI

  if (MONGODB_URI) {
    return await mongoose.connect(MONGODB_URI);
  }
};

export default connectToDb;