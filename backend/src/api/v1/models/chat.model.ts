import { model, Schema } from 'mongoose';
import type { InferSchemaType } from 'mongoose';

const querySchema = new Schema(
   {
      userClerkId: {
         type: String,
         required: true,
      },
      chatbot: {
         type: Schema.Types.ObjectId,
         ref: 'Chatbot',
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
   },
   { timestamps: true }
);

export const Chat = model('query', querySchema);

export type Chat = InferSchemaType<typeof querySchema>;
