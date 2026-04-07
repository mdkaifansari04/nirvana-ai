import {
  MICRO_EXERCISE_FEEDBACK_PROMPT,
  MICRO_EXERCISE_FEEDBACK_SCHEMA,
  MICRO_EXERCISE_GENERATION_SCHEMA,
  MICRO_EXERCISE_REPORT_PROMPT,
  MICRO_EXERCISE_REPORT_SCHEMA,
  MICRO_EXERCISE_SYSTEM_PROMPT,
  OBJECT_GENERATION_MODEL,
  getUserPromptForReportGeneration,
} from "../constants";
import { connectToDatabase } from "../db";
import { ApiError } from "../errors";
import { getGroqClient } from "../groq";
import { Chat } from "../models/chat";
import { MicroExercise } from "../models/micro-exercise";
import { Report } from "../models/report";
import { User } from "../models/user";
import type { FilledMicroExercise } from "../types";
import { parseModelJson, rethrowOrWrap } from "./_utils";

export const generateMicroExercise = async ({
  sessionGoal,
  primaryEmotion,
  mentalHealthRate,
}: {
  sessionGoal: string;
  primaryEmotion: string;
  mentalHealthRate: number;
}) => {
  try {
    const systemPrompt =
      MICRO_EXERCISE_SYSTEM_PROMPT + MICRO_EXERCISE_GENERATION_SCHEMA;

    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create a CBT micro-exercise on: ${sessionGoal}, primary emotion: ${primaryEmotion}, metal health rate: ${mentalHealthRate}`,
        },
      ],
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
    });

    const exerciseContent = parseModelJson<unknown>(
      chatCompletion.choices?.[0]?.message?.content
    );

    return { data: exerciseContent };
  } catch (error) {
    rethrowOrWrap(error, `Failed to generate micro exercise : ${String(error)}`);
  }
};

export const getFeedbackForEachStep = async (userContext: string) => {
  try {
    const systemPrompt =
      MICRO_EXERCISE_FEEDBACK_PROMPT + MICRO_EXERCISE_FEEDBACK_SCHEMA;

    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `This is user context to a reflection or MCQ question: ${userContext}`,
        },
      ],
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
    });

    const feedback = parseModelJson<unknown>(
      chatCompletion.choices?.[0]?.message?.content
    );

    return { data: feedback };
  } catch (error) {
    rethrowOrWrap(
      error,
      `Failed to get feedback for each step : ${String(error)}`
    );
  }
};

export const saveMicroExerciseWithReport = async (
  userId: string,
  filledMicroExercise: FilledMicroExercise
) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new ApiError("User not found.", 500);
    }

    const messages = await Chat.find({ userClerkId: userId });
    const reports = await Report.find({ userClerkId: userId });

    const systemPrompt =
      MICRO_EXERCISE_REPORT_PROMPT + MICRO_EXERCISE_REPORT_SCHEMA;

    const chatCompletion = await getGroqClient().chat.completions.create({
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: getUserPromptForReportGeneration({
            user,
            filledMicroExercise,
            pastConversations: messages,
            pastReports: reports,
          }),
        },
      ],
    });

    const aiGeneratedReport = parseModelJson<Record<string, unknown>>(
      chatCompletion.choices[0]?.message.content
    );

    const report = await Report.create({
      userClerkId: userId,
      ...aiGeneratedReport,
    });

    if (!report) {
      throw new ApiError("Error occured while generating report.", 500);
    }

    const completedExercise = await MicroExercise.create({
      userClerkId: userId,
      session_goal: filledMicroExercise.session_goal,
      quick_check_in: filledMicroExercise.quick_check_in,
      exercise_content: filledMicroExercise.exercise_content,
      user_reflection: filledMicroExercise.user_reflection,
      ai_generated_report: report._id,
    });

    const microExercise = await (
      await completedExercise.save()
    ).populate("ai_generated_report");

    return { data: microExercise };
  } catch (error) {
    rethrowOrWrap(error, `Failed to save micro exercise : ${String(error)}`);
  }
};

export const getUserMicroExercises = async (userId: string) => {
  await connectToDatabase();

  try {
    const microExercises = await MicroExercise.find({
      userClerkId: userId,
    }).sort({ createdAt: -1 });

    return { data: microExercises };
  } catch (error) {
    rethrowOrWrap(
      error,
      `Failed to get user micro exercises : ${String(error)}`
    );
  }
};

export const getMicroExerciseById = async (
  userId: string,
  microExerciseId: string
) => {
  await connectToDatabase();

  try {
    const microExercise = await MicroExercise.findOne({
      _id: microExerciseId,
      userClerkId: userId,
    }).populate("ai_generated_report");

    if (!microExercise) {
      throw new ApiError("Micro exercise not found or unauthorized", 404);
    }

    return { data: microExercise };
  } catch (error) {
    rethrowOrWrap(
      error,
      `Failed to get micro exercise by id : ${String(error)}`
    );
  }
};

export const deleteMicroExercise = async (
  userId: string,
  microExerciseId: string
) => {
  await connectToDatabase();

  try {
    const microExercise = await MicroExercise.findOneAndDelete({
      _id: microExerciseId,
      userClerkId: userId,
    });

    if (!microExercise) {
      throw new ApiError("Micro exercise not found or unauthorized", 404);
    }

    return { message: "Micro exercise deleted" };
  } catch (error) {
    rethrowOrWrap(
      error,
      `Failed to delete micro exercise : ${String(error)}`
    );
  }
};

export const getReportById = async (userId: string, reportId: string) => {
  await connectToDatabase();

  try {
    const report = await Report.findOne({
      _id: reportId,
      userClerkId: userId,
    });

    if (!report) {
      throw new ApiError("Report not found or unauthorized", 404);
    }

    return {
      message: "Report",
      data: report,
    };
  } catch (error) {
    rethrowOrWrap(error, `Failed to get report by id : ${String(error)}`);
  }
};
