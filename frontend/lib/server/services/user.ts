import { ApiError } from "../errors";
import { User, type UserDocument } from "../models/user";
import { connectToDatabase } from "../db";
import { rethrowOrWrap } from "./_utils";

export const createUser = async (payload: Partial<UserDocument>) => {
  await connectToDatabase();

  try {
    const user = await User.create(payload);

    return {
      message: "User created.",
      data: user,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Failed to create user");
  }
};

export const getAllUsers = async () => {
  await connectToDatabase();

  try {
    const users = await User.find({});

    return {
      message: "All User",
      data: users,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Failed to fetch users");
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return {
      message: "User by clerk id",
      data: user,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Failed to fetch user");
  }
};

export const updateUser = async (
  clerkId: string,
  payload: Partial<UserDocument>
) => {
  await connectToDatabase();

  try {
    const user = await User.findOneAndUpdate({ clerkId }, payload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return {
      message: "User updated",
      data: user,
    };
  } catch (error) {
    return rethrowOrWrap(error, "Failed to update user");
  }
};

export const deleteUser = async (clerkId: string) => {
  await connectToDatabase();

  try {
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return {
      message: "User deleted successfully",
    };
  } catch (error) {
    return rethrowOrWrap(error, "Failed to delete user");
  }
};
