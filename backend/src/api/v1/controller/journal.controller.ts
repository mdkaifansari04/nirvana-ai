import type{ Request, Response, NextFunction } from "express";
import { Journal } from "../models/journal.model";
import type { CustomRequest } from "../../../types";    
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";

