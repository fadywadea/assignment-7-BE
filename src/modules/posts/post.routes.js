'use strict'

import express from 'express';
import { AllPosts, UpdatePost, addPost, deletePost, allPostsOwner, postsOwner, tasksNotDone } from './post.controller.js';
import { auth } from '../../middleware/auth.js';

const postRouter = express.Router();
const baseUrl = '/post';

// All Tasks && Add Task && Update Post
postRouter.route(baseUrl).get(AllPosts).post(auth, addPost).patch(auth, UpdatePost);

// Delete Post
postRouter.delete('/post-delete', auth, deletePost);

// All Posts Owner
postRouter.get('/allPosts-owner', allPostsOwner);

// Posts Owner
postRouter.get('/posts-owner', auth, postsOwner);

// Tasks Not Done
postRouter.get('/tasksNotDone', tasksNotDone);

export default postRouter;