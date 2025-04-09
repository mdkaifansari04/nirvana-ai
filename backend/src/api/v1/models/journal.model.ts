import { model, Schema } from 'mongoose';

const journalSchema = new Schema(
   {
      userClerkId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);
export const Journal = model('journal', journalSchema);
