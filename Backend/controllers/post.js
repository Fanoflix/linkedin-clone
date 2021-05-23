import User from "../models/user.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

export let makePost = async (req, res, next) => {
//   const userId = mongoose.Types.ObjectId(req.body.userId);
  const userId = req.body.userId;
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

    // adding post
    const post = new Post({
      author: user._id,
      content,
    });

    await post.save();
    res.status(201).json({ message: "Posted for: " + user._id });
  } catch (err) {
    next(err);
  }
};

export let getPosts = async (req, res, next) => {
  const posts = await Post.find({})
  console.log(posts)
  res.json({
    posts
  })
}
