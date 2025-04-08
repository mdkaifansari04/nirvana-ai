import mongoose from "mongoose";
import { MONGO_URL } from "../config/env";

const connectDB = async () => {
	try {
		if (!MONGO_URL) {
			throw new Error("MONGO_URL is not defined in the environment variables.");
		}

		const conn = await mongoose.connect(MONGO_URL);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		process.exit(1);
	}
};

export default connectDB;
