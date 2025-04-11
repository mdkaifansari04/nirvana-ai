import type { Request, Response, NextFunction } from 'express';
import { Journal } from '../models/journal.model';
import type { CustomRequest } from '../../../types';
import ErrorResponse from '../../../helper/errorResponse';
import dayjs from 'dayjs';

export const addJournal = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { userId } = req.params;
      const { title, content } = req.value;

      const journalEntry = await Journal.create({
         userClerkId: userId,
         title,
         content,
      });
      if (!journalEntry) return next(new ErrorResponse('Error occured while creating journal', 400));

      res.status(200).json({
         success: true,
         message: 'Journal created',
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
         return next(new ErrorResponse('No journal found', 404));
      }

      res.status(200).json({
         success: true,
         message: 'User Journal',
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
         return next(new ErrorResponse('Journal entry not found', 404));
      }

      res.status(200).json({
         success: true,
         message: 'Journal by id',
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
         return next(new ErrorResponse('Journal entry not found or unauthorized', 404));
      }

      res.status(200).json({ success: true, message: 'Journal deleted' });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};

export const updateJournal = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { journalId } = req.params;

      const journal = await Journal.findByIdAndUpdate({ _id: journalId }, req.body, { new: true });
      if (!journal) return next(new ErrorResponse('Error occured while updating journal', 400));

      res.status(201).json({
         success: true,
         message: 'Journal updated',
         data: journal,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};

export const getJournalAnalytics = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { userId } = req.params;

   try {
      // 1. Calendar: Entry count per day
      const calendarAgg = await Journal.aggregate([
         { $match: { userClerkId: userId } },
         {
            $group: {
               _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
               },
               count: { $sum: 1 },
            },
         },
      ]);

      const calendar = Object.fromEntries(calendarAgg.map((item) => [item._id, item.count]));

      // 2. Total entries
      const totalEntries = await Journal.countDocuments({ userClerkId: userId });

      // 3. Streak Counter
      const entries = await Journal.find({ userClerkId: userId }).sort({ createdAt: -1 }).select('createdAt');

      let streak = 0;
      let today = dayjs().startOf('day');

      for (let entry of entries) {
         const entryDate = dayjs(entry.createdAt).startOf('day');
         if (entryDate.isSame(today)) {
            streak++;
            today = today.subtract(1, 'day');
         } else if (entryDate.isSame(today.subtract(1, 'day'))) {
            streak++;
            today = today.subtract(2, 'day');
         } else {
            break;
         }
      }

      // Average entry length per day
      const avgLengthAgg = await Journal.aggregate([
         { $match: { userClerkId: userId } },
         {
            $project: {
               date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
               },
               wordCount: {
                  $size: {
                     $filter: {
                        input: { $split: ['$content', ' '] },
                        as: 'word',
                        cond: { $ne: ['$$word', ''] },
                     },
                  },
               },
            },
         },
         {
            $group: {
               _id: '$date',
               averageWordCount: { $avg: '$wordCount' },
            },
         },
         { $sort: { _id: 1 } },
      ]);

      const averageLengthPerDay = avgLengthAgg.map((item) => ({
         date: item._id,
         averageWordCount: Math.round(item.averageWordCount),
      }));

      const overallAverageLength = Math.round(averageLengthPerDay.reduce((sum, d) => sum + d.averageWordCount, 0) / (averageLengthPerDay.length || 1));

      // === RECENT ENTRIES LIST ===
      const recentEntries = await Journal.find({ userClerkId: userId }).sort({ createdAt: -1 }).limit(10).lean();

      const recentFormatted = recentEntries.map((entry) => ({
         id: entry._id,
         title: entry.title,
         timestamp: entry.createdAt,
         wordCount: entry.content.trim().split(/\s+/).length,
         preview: entry.content.slice(0, 100) + (entry.content.length > 100 ? '...' : ''),
      }));

      res.status(200).json({
         success: true,
         data: {
            activityOverview: {
               calendar,
               currentStreak: {
                  count: streak,
                  endDate: dayjs().format('YYYY-MM-DD'),
                  startDate: dayjs()
                     .subtract(streak - 1, 'day')
                     .format('YYYY-MM-DD'),
               },
               totalEntries,
            },
            contentInsights: {
               averageLengthPerDay,
               overallAverageLength,
            },
            recentEntries: {
               sortBy: 'timestamp',
               order: 'desc',
               entries: recentFormatted,
            },
         },
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};
