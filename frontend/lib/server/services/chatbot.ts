import { ApiError } from "../errors";
import { Chatbot, type ChatbotDocument } from "../models/chatbot";
import { connectToDatabase } from "../db";
import { rethrowOrWrap } from "./_utils";

export const createChatbot = async (payload: Partial<ChatbotDocument>) => {
  await connectToDatabase();

  try {
    const chatbot = await Chatbot.create(payload);

    return {
      message: "Chatbot created successfully",
      data: chatbot,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const getAllChatbots = async () => {
  await connectToDatabase();

  try {
    const chatbots = await Chatbot.find({});

    return {
      message: "Chatbots fetched successfully",
      data: chatbots,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const getChatbotById = async (id: string) => {
  await connectToDatabase();

  try {
    const chatbot = await Chatbot.findById(id);

    if (!chatbot) {
      throw new ApiError("Chatbot not found", 404);
    }

    return {
      message: "Chatbot fetched successfully",
      data: chatbot,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const updateChatbot = async (
  id: string,
  payload: Partial<ChatbotDocument>
) => {
  await connectToDatabase();

  try {
    const chatbot = await Chatbot.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (!chatbot) {
      throw new ApiError("Chatbot not found", 404);
    }

    return {
      message: "Chatbot updated successfully",
      data: chatbot,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const deleteChatbot = async (id: string) => {
  await connectToDatabase();

  try {
    const chatbot = await Chatbot.findByIdAndDelete(id);

    if (!chatbot) {
      throw new ApiError("Chatbot not found", 404);
    }

    return {
      message: "Chatbot deleted successfully",
      data: chatbot,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

const createMany = async (chatbots: unknown[]) => {
  await connectToDatabase();

  try {
    if (!Array.isArray(chatbots) || chatbots.length === 0) {
      throw new ApiError("Internal server error", 500);
    }

    const createdChatbots = await Chatbot.insertMany(chatbots, {
      ordered: false,
    });

    return {
      message: "Chatbots created successfully.",
      data: createdChatbots,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};

export const createManyChatbot = createMany;

export const uploadManyChatbot = async (chatbots: unknown[]) => {
  await connectToDatabase();

  try {
    if (!Array.isArray(chatbots)) {
      throw new ApiError("Internal server error", 500);
    }

    const createdChatbots = await Chatbot.insertMany(chatbots, {
      ordered: false,
    });

    return {
      message: "Chatbots created successfully.",
      data: createdChatbots,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Internal server error");
  }
};
