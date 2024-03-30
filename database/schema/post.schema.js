import mongoose from "mongoose";

// Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    // Move 'id' to the top
    const { id, ...rest } = ret;
    return { id, ...rest };
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
