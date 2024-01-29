'use strict'

import { userModel } from "../../../database/models/user.model.js"
import { sendEmail, sendEmailPass } from "../../emails/sendEmail.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Get All Users
export const getAllUsers = async (req, res) => {
  const user = await userModel.find();
  if (user.length) {
    res.status(200).json({ message: user });
  } else {
    res.status(404).json({ message: "No users found!" });
  }
};

// Sign Up
export const SignUp = async (req, res) => {
  await userModel.insertMany(req.body);
  sendEmail(req.body.email, req.body.name);
  res.status(201).json({ message: "success" });
};

// Verify Email
export const verifyEmail = async (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ error: err.message });
    await userModel.findOneAndUpdate({ email: decoded.email }, { isVerified: true });
    res.status(200).json({ message: "success" });
  });
};

// Signin
export const Signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      if (user.isVerified) {
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY);
        res.status(200).json({ message: `Welcome ${user.name}.`, token });
      } else { res.status(401).json({ message: "Account not verify." }); }
    } else { res.status(401).json({ message: "Invalid Password." }); }
  } else { res.status(401).json({ message: "Invalid Email." }); }
};

// Change Password
export const changePassword = async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  await userModel.findOneAndUpdate({ email: user.email }, {
    password: req.body.password = bcrypt.hashSync(req.body.password, +process.env.HASH_PASS)
  });
  sendEmailPass(user.email, user.name);
  res.status(200).json({ message: "success" });
};

// Update User
export const updateUser = async (req, res) => {
  await userModel.findOneAndUpdate({ email: req.user.email }, { name: req.body.name, age: req.body.age });
  res.status(200).json({ message: "success" });
};

// Delete User
export const DeleteUser = async (req, res) => {
  await userModel.findOneAndDelete({ email: req.user.email });
  res.status(200).json({ message: "success" });
};

// Soft Delete User
export const softDeleteUser = async (req, res) => {
  await userModel.findOneAndUpdate({ email: req.user.email }, { isActive: false });
  res.status(200).json({ message: "success" });
};

// Logout User
export const logOut = (req, res) => {
  res.json({ message: "success" });
};