import express from 'express';
import { journalController as J } from '../../controller';
import { journalValidation } from '../../../../validation/journal-validation';

const journalRouter = express.Router({ mergeParams: true });

journalRouter.get('/:userId', J.getUserJournals);
journalRouter.get('/:journalId/:userId', J.getJournalById);
journalRouter.post('/:userId', journalValidation, J.addJournal);
journalRouter.delete('/:journalId/:userId', J.deleteJournalEntry);
journalRouter.put('/:journalId', J.updateJournal);
journalRouter.get('/:userId/analytics', J.getJournalAnalytics);

export default journalRouter;
