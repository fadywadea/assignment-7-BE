'use strict'

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['toDo', 'doing', 'done'],
    default: 'toDo'
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  assignTo: {
    type: mongoose.Schema.ObjectId,
    default: null
  },
  deadline: Date
}, { timestamps: true });

export const postModel = mongoose.model('post', postSchema);