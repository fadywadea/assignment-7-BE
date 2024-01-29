'use strict'

import { userModel } from "../../database/models/user.model.js";
import bcrypt from 'bcrypt';

export const CheckEmailExist = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({ message: "This Email is already exist" });
  } else {
    // Hash password before saving to database
    req.body.password = bcrypt.hashSync(req.body.password, +process.env.HASH_PASS);
    next();
  }
}