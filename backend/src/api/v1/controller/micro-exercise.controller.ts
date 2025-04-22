import type { NextFunction, Response } from "express";
import { OBJECT_GENERATION_MODEL } from "../../../constants/llms";
import { MICRO_EXERCISE_GENERATION_SCHEMA, MICRO_EXERCISE_REPORT_SCHEMA, SESSION_GOALS } from "../../../constants/micro-exercises";
import { getUserPromptForReportGeneration, MICRO_EXERCISE_REPORT_PROMPT, MICRO_EXERCISE_SYSTEM_PROMPT } from "../../../constants/prompt";
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";
import type { CustomRequest } from "../../../types";
import { Chat } from "../models/chat.model";
import { MicroExercise } from "../models/micro-exercise.model";
import { Report } from "../models/report.model";
import { User } from "../models/user.model";
import { getAuth } from "@clerk/express";

export const generateMicroExercise = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionGoal, primaryEmotion, metalHealthRate } = req.value;

    const systemPrompt = MICRO_EXERCISE_SYSTEM_PROMPT + MICRO_EXERCISE_GENERATION_SCHEMA;

    const chat_completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create a CBT micro-exercise on: ${sessionGoal}, primary emotion: ${primaryEmotion}, metal health rate: ${metalHealthRate}`,
        },
      ],
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
    });

    const exerciseContent = JSON.parse(chat_completion.choices?.[0]?.message?.content ?? "{}");
    res.status(200).json({ success: true, data: exerciseContent });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const saveMicroExerciseWithReport = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const filledMicroExercise = req.value;

    const user = await User.findOne({ clerkId: userId });
    if (!user) return next(new ErrorResponse("User not found.", 500));

    const messages = await Chat.find({ userClerkId: userId });
    const reports = await Report.find({ userClerkId: userId });

    const systemPrompt = MICRO_EXERCISE_REPORT_PROMPT + MICRO_EXERCISE_REPORT_SCHEMA;

    const chat_completion = await groq.chat.completions.create({
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: getUserPromptForReportGeneration({ user, filledMicroExercise, pastConversations: messages, pastReports: reports }),
        },
      ],
    });

    const aiGeneratedReport = JSON.parse(chat_completion.choices[0]?.message.content ?? "{}");
    const report = await Report.create({ userClerkId: userId, ...aiGeneratedReport });
    if (!report) return next(new ErrorResponse("Error occured while genearting report.", 500));

    const completedExercise = await MicroExercise.create({
      userClerkId: userId,
      session_goal: filledMicroExercise.session_goal,
      quick_check_in: filledMicroExercise.quick_check_in,
      exercise_content: filledMicroExercise.exercise_content,
      user_reflection: filledMicroExercise.user_reflection,
      ai_generated_report: report._id,
    });

    const microExercise = await (await completedExercise.save()).populate("ai_generated_report");

    res.status(200).json({ success: true, data: microExercise });
  } catch (error) {
    console.error("Error saving micro exercise:", error);
    next(error);
  }
};

export const getUserMicroExercises = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);

    const microExercises = await MicroExercise.find({
      userClerkId: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: microExercises });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getMicroExerciseById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { microExerciseId } = req.params;

    const microExercise = await MicroExercise.findOne({
      _id: microExerciseId,
      userClerkId: userId,
    });

    if (!microExercise) {
      return next(new ErrorResponse("Micro exercise not found or unauthorized", 404));
    }

    res.status(200).json({ success: true, data: microExercise });
  } catch (error) {
    console.error("Error fetching micro exercise:", error);
    next(error);
  }
};

export const deleteMicroExercise = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { microExerciseId } = req.params;

    const microExercise = await MicroExercise.findOneAndDelete({
      _id: microExerciseId,
      userClerkId: userId,
    });

    if (!microExercise) {
      return next(new ErrorResponse("Micro exercise not found or unauthorized", 404));
    }

    res.status(200).json({ success: true, message: "Micro exercise deleted" });
  } catch (error) {
    console.error("Error deleting micro exercise:", error);
    next(error);
  }
};

export const getReportById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { reportId } = req.params;

    const report = await Report.findOne({
      _id: reportId,
      userClerkId: userId,
    });

    if (!report) {
      return next(new ErrorResponse("Report not found or unauthorized", 404));
    }

    res.status(200).json({ success: true, message: "Report", data: report });
  } catch (error) {
    console.error("Error fetching report:", error);
    next(error);
  }
};
