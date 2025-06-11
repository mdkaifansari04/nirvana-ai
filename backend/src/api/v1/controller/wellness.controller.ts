

import { getAuth } from "@clerk/express";
import { NextFunction, Response } from "express";
import { CustomRequest } from "types";
import { WellnessCard } from "../models/welness-card.model";
import { WELLNESS_CARD_PROMPT } from "constants/prompt";
import { groq } from "lib/groq";
import { WELLNESS_CARD_GENERATION_SCHEMA } from "constants/wellness-card";
import { OBJECT_GENERATION_MODEL } from "constants/llms";
import ErrorResponse from "helper/errorResponse";

export const getWellness = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);
        const { category, quote, action, emoji } = req.value;

        const wellnessCard = await WellnessCard.create({
            userClerkId: userId,
            category,
            quote,
            action,
            emoji,
        });

        res.status(200).json({ success: true, data: wellnessCard });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse("Failed to create wellness card : " + error, 500));
    }
};

export const getWellnessCards = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);
        const wellnessCards = await WellnessCard.find({ userClerkId: userId });
        res.status(200).json({ success: true, data: wellnessCards });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse("Failed to get wellness cards", 500));
    }
};

export const deleteWellnessCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);
        const { id } = req.params;
        await WellnessCard.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: "Wellness card deleted" });
    } catch (error) {
        console.error(error);
        next(new ErrorResponse("Failed to delete wellness card : " + error, 500));
    }
};

export const generateWellnessCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { userContext } = req.value;
        const systemPrompt = WELLNESS_CARD_PROMPT + WELLNESS_CARD_GENERATION_SCHEMA;

        const chat_completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContext },
            ],
            model: OBJECT_GENERATION_MODEL,
            temperature: 0.4,
            stream: false,
            response_format: { type: "json_object" },
        });

        const wellnessCard = JSON.parse(chat_completion.choices?.[0]?.message?.content ?? "{}");
        res.status(200).json({ success: true, data: wellnessCard.wellnessCard });

    } catch (error) {
        console.error(error);
        next(new ErrorResponse("Failed to generate wellness card : " + error, 500));
    }
};