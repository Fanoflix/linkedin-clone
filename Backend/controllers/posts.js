import User from "../models/user.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

export let makePost = async (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;

  try {
    const user = await User.findById(userId);

    // checking user
    if (!user) {
      const error = new Error(
        "Unexpeted Error Encountered, User was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    const post = new Post({
      author: userId,
      content,
    });

    // adding post
    const result = await post.save();

    // adding post to user
    user.posts.push(result._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Posted for: " + user._id});
  } catch (err) {
    next(err);
  }
};

export let likePost = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.body.postId;
  console.log(userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error(
        "Unexpeted Error Encountered, Post was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    console.log(post.likes);
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((item) => item === userId);
      post.count -= 1;
    } else {
      post.likes.push(mongoose.Types.ObjectId(userId));
      post.count += 1;
    }

    await post.save();

    res.status(200).json({
      message: "Post Liked!"
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      author: req.userId,
    })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getConPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User not found");
      error.statusCode = 404;
      throw err;
    }

    const posts = await Post.find({
      author: {
        $in: user.connections,
      },
    })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export let getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    console.log(post)

    if (!post) {
      const err = new Error("Post not Found!");
      error.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      post
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
