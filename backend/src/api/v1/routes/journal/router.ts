import express from "express";
import { journalController as J } from "../../controller";
import { journalValidation } from "../../../../validation/journal-validation";

const journalRouter = express.Router({ mergeParams: true });

journalRouter.get("/", J.getUserJournals);
journalRouter.get("/:journalId", J.getJournalById);
journalRouter.post("/", journalValidation, J.addJournal);
journalRouter.delete("/:journalId", J.deleteJournalEntry);
journalRouter.put("/:journalId", J.updateJournal);

export default journalRouter;
