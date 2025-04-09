import express from "express";
import {
	addJournal,
	getJournals,
	getJournalById,
	deleteJournalEntry,
} from "../../controller/journal.controller";
import { journalValidation } from "../../../../validation/journal-validation";


const journalRouter = express.Router();

journalRouter.post("/", journalValidation, addJournal);
journalRouter.get("/", getJournals);
journalRouter.get("/:id", getJournalById);
journalRouter.delete("/:id", deleteJournalEntry);

export default journalRouter;
