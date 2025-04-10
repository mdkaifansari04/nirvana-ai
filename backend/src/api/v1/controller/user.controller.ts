import type { NextFunction, Response } from 'express';
import type { CustomRequest } from '../../../types';

import ErrorResponse from '../../../helper/errorResponse';
import { User } from '../models/user.model';

// Create a new user
export const createUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const user = await User.create(req.value);

      res.status(201).json({
         success: true,
         message: 'User created.',
         data: user,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse('Failed to create user', 500));
   }
};

// Get all users
export const getAllUsers = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const users = await User.find({});

      res.status(200).json({
         success: true,
         message: 'All User',
         data: users,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse('Failed to fetch users', 500));
   }
};

// Get single user by clerkId
export const getUserByClerkId = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const user = await User.findOne({ clerkId: id });

      if (!user) {
         return next(new ErrorResponse('User not found', 404));
      }

      res.status(200).json({
         success: true,
         message: 'User by clerk id',
         data: user,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse('Failed to fetch user', 500));
   }
};

// Update user by clerkId
export const updateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const user = await User.findOneAndUpdate({ clerkId: id }, req.body, {
         new: true,
         runValidators: true,
      });

      if (!user) {
         return next(new ErrorResponse('User not found', 404));
      }

      res.status(200).json({
         success: true,
         message: 'User updated',
         data: user,
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse('Failed to update user', 500));
   }
};

// Delete user by clerkId
export const deleteUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ clerkId: id });

      if (!user) {
         return next(new ErrorResponse('User not found', 404));
      }

      res.status(200).json({
         success: true,
         message: 'User deleted successfully',
      });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse('Failed to delete user', 500));
   }
};
