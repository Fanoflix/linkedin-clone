import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: {
        type: String,
    }
});

export default mongoose.model("Post", postSchema)