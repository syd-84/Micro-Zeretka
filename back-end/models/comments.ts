import { Schema, model } from "mongoose";

const commentsSchema = new Schema({
  id: {
    type: String,
    required: true,
    immutable: true,
  },
  commentText: String,
  date: String,
  productId: String,
  userId: String,
})

export const commentsModel = model('comments', commentsSchema);