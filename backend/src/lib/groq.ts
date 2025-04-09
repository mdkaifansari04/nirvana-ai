import Groq from 'groq-sdk';
import { GROQ_API_KEY } from '../config/env';

export const groq = new Groq({ apiKey: GROQ_API_KEY });
