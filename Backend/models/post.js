import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        
      },
    ],
    count: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
