import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
    default: ''
  },
  resumeUrl: {
    type: String,
    required: false
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  skills: [
    {
      name: {type: String, required: true },
      endorsements: {type: Number, default: 0}
    },
  ],
});

export default mongoose.model("User", userSchema);
