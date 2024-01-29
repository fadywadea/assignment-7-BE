'use strict'

import express from 'express';
import { DeleteUser, SignUp, Signin, changePassword, getAllUsers, logOut, softDeleteUser, updateUser, verifyEmail } from "./user.controller.js";
import { CheckEmailExist } from '../../middleware/checkEmailExist.js';
import { auth } from '../../middleware/auth.js';

const userRouter = express.Router();

// Get All Users
userRouter.get('/users', getAllUsers);

// Sign Up
userRouter.post('/users', CheckEmailExist, SignUp);

// Verify Email
userRouter.get('/verify/:token', verifyEmail);

// Signin
userRouter.post('/signin', Signin);

// Change Password
userRouter.patch('/change-password', auth, changePassword);

// Update User
userRouter.patch('/user', auth, updateUser);

// Delete User
userRouter.delete('/delete-user', auth, DeleteUser);

// Soft Delete User
userRouter.patch('/soft-delete-user', auth, softDeleteUser);

// Logout User
userRouter.get('/logout', logOut);

export default userRouter;