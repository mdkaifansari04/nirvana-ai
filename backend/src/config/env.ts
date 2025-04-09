import { config } from 'dotenv';
import path from 'path';

const envFile = path.resolve(process.cwd(), '.env.local');

config({ path: envFile });

export const { PORT, GROQ_API_KEY, MONGO_URL } = process.env;
