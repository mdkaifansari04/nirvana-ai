

import { Schema, model } from "mongoose";

const wellnessCardSchema = new Schema({
    userClerkId: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});


export const WellnessCard = model("WellnessCard", wellnessCardSchema);