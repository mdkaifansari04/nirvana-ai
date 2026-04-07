import { auth } from "@clerk/nextjs/server";
import { ApiError } from "./errors";

export const extractUserId = (userId: string | null | undefined): string => {
  if (!userId) {
    throw new ApiError("Unauthorized", 401);
  }

  return userId;
};

export const getAuthUserId = async (): Promise<string> => {
  const { userId } = await auth();
  return extractUserId(userId);
};
