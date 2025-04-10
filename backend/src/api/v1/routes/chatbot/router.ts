import express from 'express';
import { chatbotController as CC } from '../../controller';
import { queryValidation } from '../../../../validation/chatbot-validation';
const chatbotRouter = express.Router({ mergeParams: true });

chatbotRouter.get('/', CC.getAllChatbots);
chatbotRouter.post('/:chatbotKey', CC.initializeMessageThread);
chatbotRouter.get('/:chatbotKey/messages', CC.getMessages);
chatbotRouter.post('/:chatbotKey/messages', queryValidation, CC.createMessage);
chatbotRouter.delete('/:chatbotKey/messages', CC.deleteAllMessages);
chatbotRouter.delete('/:chatbotKey/messages/:messageId', CC.deleteMessageById);

export default chatbotRouter;
