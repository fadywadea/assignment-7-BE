'use strict'

import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';
import jwt from 'jsonwebtoken';
import { emailTemplatePass } from './emailNewPass.js';

export const sendEmail = async (email, name) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fwadea3@gmail.com",
      pass: process.env.Pass_Gmail
    }
  });

  let token = jwt.sign({ email }, process.env.JWT_KEY);

  const info = await transporter.sendMail({
    from: '"Assignment_7" <fwadea3@gmail.com>',
    to: email,
    subject: `Welcome ${name}! Please verify your account`,
    html: emailTemplate(token, name),
  });

  console.log("Message sent: %s", info.messageId);
}

export const sendEmailPass = async (email, name) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fwadea3@gmail.com",
      pass: process.env.Pass_Gmail
    }
  });

  const info = await transporter.sendMail({
    from: '"Assignment_7" <fwadea3@gmail.com>',
    to: email,
    subject: `Welcome ${name}! Please verify your account`,
    html: emailTemplatePass( name),
  });

  console.log("Message sent: %s", info.messageId);
}