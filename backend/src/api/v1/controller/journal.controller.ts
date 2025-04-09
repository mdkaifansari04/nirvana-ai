import type { Request, Response, NextFunction } from 'express';
import { Journal } from '../models/journal.model';
import type { CustomRequest } from '../../../types';
import ErrorResponse from '../../../helper/errorResponse';

export const addJournal = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { userId, journal } = req.value;

      const journalEntry = await Journal.create({
         userClerkId: userId,
         ...journal,
      });

      res.status(200).json({
         success: true,
         data: journalEntry,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};

export const getJournals = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { userId } = req.query;

      const journals = await Journal.find({ userClerkId: userId });

      if (!journals) {
         return next(new ErrorResponse('No journal found', 404));
      }

      res.status(200).json({
         success: true,
         data: journals,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};

export const getJournalById = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { journalId } = req.params;

      console.log(journalId);
      const journal = await Journal.findOne({
         _id: journalId,
      });

      console.log(journalId, journal);

      if (!journal) {
         return next(new ErrorResponse('Journal entry not found', 404));
      }

      res.status(200).json({
         success: true,
         data: journal,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};

export const deleteJournalEntry = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { journalId } = req.params;
      const { userId } = req.value;

      const journal = await Journal.findOneAndDelete({
         _id: journalId,
         userClerkId: userId,
      });

      if (!journal) {
         return next(new ErrorResponse('Journal entry not found or unauthorized', 404));
      }

      res.status(200).json({ success: true, message: 'Journal deleted' });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};
