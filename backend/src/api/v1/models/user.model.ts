import { model, Schema } from 'mongoose';

const userSchema = new Schema({
   clerkId: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   weight: {
      type: String,
      required: true,
   },
   gender: {
      type: String,
      required: true,
   },
   symptom: [String],
});

export const User = model('User', userSchema);
