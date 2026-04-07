import mongoose from "mongoose";
import { ApiError } from "./errors";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var __nirvanaMongoose__: MongooseCache | undefined;
}

const globalCache = globalThis.__nirvanaMongoose__ ?? {
  conn: null,
  promise: null,
};

globalThis.__nirvanaMongoose__ = globalCache;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new ApiError("MONGO_URL is not defined in environment variables.", 500);
  }

  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(mongoUrl);
  }

  try {
    globalCache.conn = await globalCache.promise;
  } catch (error) {
    globalCache.promise = null;
    throw error;
  }

  return globalCache.conn;
};

export default connectToDatabase;
