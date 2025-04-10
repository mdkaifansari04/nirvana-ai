import type { Request, Response, NextFunction } from "express";
import { Journal } from "../models/journal.model";
import type { CustomRequest } from "../../../types";
import ErrorResponse from "../../../helper/errorResponse";

export const addJournal = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.value;

    const journalEntry = await Journal.create({
      userClerkId: userId,
      title,
      content,
    });
    if (!journalEntry) return next(new ErrorResponse("Error occured while creating journal", 400));

    res.status(200).json({
      success: true,
      message: "Journal created",
      data: journalEntry,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};

export const getUserJournals = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const journals = await Journal.find({ userClerkId: userId });

    if (!journals) {
      return next(new ErrorResponse("No journal found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User Journal",
      data: journals,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};

export const getJournalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, journalId } = req.params;

    const journal = await Journal.findOne({
      _id: journalId,
      userClerkId: userId,
    });

    if (!journal) {
      return next(new ErrorResponse("Journal entry not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Journal by id",
      data: journal,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};

export const deleteJournalEntry = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId, journalId } = req.params;

    const journal = await Journal.findOneAndDelete({
      _id: journalId,
      userClerkId: userId,
    });

    if (!journal) {
      return next(new ErrorResponse("Journal entry not found or unauthorized", 404));
    }

    res.status(200).json({ success: true, message: "Journal deleted" });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};

export const updateJournal = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { journalId } = req.params;

    const journal = await Journal.findByIdAndUpdate({ _id: journalId }, req.body, { new: true });
    if (!journal) return next(new ErrorResponse("Error occured while updating journal", 400));

    res.status(201).json({
      success: true,
      message: "Journal updated",
      data: journal,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};
