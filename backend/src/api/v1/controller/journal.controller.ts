import type { Request, Response, NextFunction } from "express";
import { Journal } from "../models/journal.model";
import type { CustomRequest } from "../../../types";
import ErrorResponse from "../../../helper/errorResponse";


export const addJournal = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userClerkId } = req.value;
        const { title, text } = req.body;

        if (!title || !text) {
            return next(new ErrorResponse("Title and text are required", 400));
        }

        const journalEntry = await Journal.findOneAndUpdate(
            { userClerkId },
            {
                $push: {
                    messages: {
                        title,
                        text,
                        timestamps: Date.now(),
                    },
                },
            },
            { new: true, upsert: true }
        );

        res.status(200).json(journalEntry);
    } catch (error) {
        next(error);
    }
};

export const getJournals = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userClerkId } = req.value;

        const journal = await Journal.findOne({ userClerkId });

        if (!journal) {
            return next(new ErrorResponse("No journal found", 404));
        }

        res.status(200).json(journal);
    } catch (error) {
        next(error);
    }
};


export const getJournalById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const journal = await Journal.findOne({ "messages._id": id });

        if (!journal) {
            return next(new ErrorResponse("Journal entry not found", 404));
        }

        const entry = journal.messages.id(id);

        res.status(200).json(entry);
    } catch (error) {
        next(error);
    }
};

export const deleteJournalEntry = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { userClerkId } = req.value;

        const journal = await Journal.findOneAndUpdate(
            { userClerkId },
            { $pull: { messages: { _id: id } } },
            { new: true }
        );

        if (!journal) {
            return next(new ErrorResponse("Journal entry not found", 404));
        }

        res.status(200).json({ message: "Journal entry deleted", journal });
    } catch (error) {
        next(error);
    }
};