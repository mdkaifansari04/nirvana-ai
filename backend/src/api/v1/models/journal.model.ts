import { model, Schema } from "mongoose";

const journalSchema = new Schema(
    {
        userClerkId: {
            type: String,
            required: true,
        },
        messages: [
            {
                title: {
                    type: String,
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
    { timestamps: true },
);
export const Journal = model("journal", journalSchema);