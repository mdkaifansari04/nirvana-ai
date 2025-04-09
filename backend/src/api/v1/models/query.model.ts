import { model, Schema } from 'mongoose';

const querySchema = new Schema(
   {
      userClerkId: {
         type: String,
         required: true,
      },
      messages: [
         {
            sender: {
               type: String,
               enum: ['user', 'model'],
               required: true,
            },
            text: {
               type: String,
               required: true,
            },
            timestamps: {
               type: Date,
               default: Date.now(),
            },
         },
      ],
      sessionId: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Query = model('query', querySchema);
