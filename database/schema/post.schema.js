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

// Apply the toJSON transformation to the schema
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    // Remove _id and __v
    delete ret._id;
    delete ret.__v;

    // Move 'id' to the top
    const { id, ...rest } = ret;
    return { id, ...rest };
  }
});


// Create model using the schema
const Post = mongoose.model('Post', postSchema);

// Exporting the Post model
export default Post;
