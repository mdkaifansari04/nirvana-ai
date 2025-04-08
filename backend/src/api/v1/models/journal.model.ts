import {model, Schema} from "mongoose";

const journalSchema = new Schema(
    {
        userClerkId: {
            type: String,
            required: true,
        },
        messages: [
            {
                sender: {
                    type: String,
                    enum: ["user", "model"],
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
    {timestamps: true},
);
export const Journal = model("journal", journalSchema);