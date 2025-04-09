import express from "express";
import { journalController as J } from "../../controller";
import { journalValidation } from "../../../../validation/journal-validation";
import { userIdValidation } from "../../../../validation/user-id-validation";

const journalRouter = express.Router();

journalRouter.get("/", J.getJournals);
journalRouter.get("/:journalId", J.getJournalById);
journalRouter.post("/", journalValidation, J.addJournal);
journalRouter.delete("/:journalId", userIdValidation, J.deleteJournalEntry);

export default journalRouter;
