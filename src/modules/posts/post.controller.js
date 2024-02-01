'use strict'

import { postModel } from "../../../database/models/post.model.js"
import { userModel } from "../../../database/models/user.model.js";

// All Posts
export const AllPosts = async (req, res) => {
  const posts = await postModel.find();
  res.status(200).json({ data: posts });
};

// Add Post
export const addPost = async (req, res) => {
  await postModel.insertMany(req.body);
  req.user.userId == req.body.creator ?
    res.status(201).json({ message: "success" }) :
    res.status(403).json({ message: "Unauthorized!" });
};

// Update Post
export const UpdatePost = async (req, res) => {

  const user = await userModel.findOne({ _id: req.user.userId });
  const post = await postModel.findOne({ _id: req.body._id });

  if (post) {
    if (String(user._id) === String(post.creator)) {
      if (req.body.status == "toDo" || req.body.status == "doing" || req.body.status == "done") {
        if (await userModel.findOne({ _id: req.body.assignTo })) {
          await postModel.updateOne(
            { _id: post._id },
            { title: req.body.title, description: req.body.description, status: req.body.status, assignTo: req.body.assignTo }
          );
          res.status(200).json({ message: "success" });
        } else { res.status(404).json({ message: "User not found" }); }
      } else { res.status(400).json({ message: "Invalid status" }); }
    } else { res.status(403).json({ message: "Unauthorized" }); }
  } else { res.status(404).json({ message: "User not found" }); }
};

// Delete Post
export const deletePost = async (req, res) => {

  const user = await userModel.findOne({ _id: req.user.userId });
  const deleted = await postModel.findOne({ _id: req.body._id });

  if (String(user._id) === String(deleted.creator)) {
    await postModel.deleteOne({ _id: deleted._id });
    res.status(200).json({ message: "success" });
  } else { res.status(403).json({ message: "Unauthorized" }); }
};

// All Posts With Owners
export const allPostsOwner = async (req, res) => {
  const postsOwner = await postModel.find().populate('creator', 'name email -_id');
  res.status(200).json({ data: postsOwner });
};

// Posts Owner
export const postsOwner = async (req, res) => {
  const posts = await postModel.find({ creator: req.user.userId });
  if (posts) {
    res.status(200).json({ message: posts });
  } else {
    res.status(404).json({ message: "No posts found" });
  }
};

// Tasks Not Done
export const tasksNotDone = async (req, res) => {
  const currentDate = new Date();
  console.log(currentDate);
  const tasks = await postModel.find({
    status: { $ne: 'done' },
    deadline: { $lt: currentDate },
  })
  .sort([['deadline', 'asc']])
  res.json(tasks);
}
