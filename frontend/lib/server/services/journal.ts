import { connectToDatabase } from "../db";
import { ApiError } from "../errors";
import { Journal, type JournalDocument } from "../models/journal";
import { User } from "../models/user";
import { rethrowOrWrap } from "./_utils";

export const addJournal = async (
  userId: string,
  payload: Pick<JournalDocument, "title" | "content">
) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const journalEntry = await Journal.create({
      userClerkId: userId,
      title: payload.title,
      content: payload.content,
    });

    if (!journalEntry) {
      throw new ApiError("Error occured while creating journal", 400);
    }

    return {
      message: "Journal created",
      data: journalEntry,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const getUserJournals = async (userId: string) => {
  await connectToDatabase();

  try {
    const journals = await Journal.find({ userClerkId: userId });

    if (!journals) {
      throw new ApiError("No journal found", 404);
    }

    return {
      message: "User Journal",
      data: journals,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const getJournalById = async (userId: string, journalId: string) => {
  await connectToDatabase();

  try {
    const journal = await Journal.findOne({
      _id: journalId,
      userClerkId: userId,
    });

    if (!journal) {
      throw new ApiError("Journal entry not found", 404);
    }

    return {
      message: "Journal by id",
      data: journal,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const deleteJournalEntry = async (
  userId: string,
  journalId: string
) => {
  await connectToDatabase();

  try {
    const journal = await Journal.findOneAndDelete({
      _id: journalId,
      userClerkId: userId,
    });

    if (!journal) {
      throw new ApiError("Journal entry not found or unauthorized", 404);
    }

    return {
      message: "Journal deleted",
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const updateJournal = async (
  journalId: string,
  payload: Partial<JournalDocument>
) => {
  await connectToDatabase();

  try {
    const journal = await Journal.findByIdAndUpdate(
      { _id: journalId },
      payload,
      { new: true }
    );

    if (!journal) {
      throw new ApiError("Error occured while updating journal", 400);
    }

    return {
      message: "Journal updated",
      data: journal,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};
