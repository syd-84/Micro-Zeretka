import { Schema, model } from "mongoose";

const goodsSchema = new Schema({
  id: {
    type: String,
    required: true,
    immutable: true,
  },
  name: String,
  description: String,
  imgSrc: String,
  price: Number,
  category: String,
}, { timestamps: true });

export const goodsModel = model('goods', goodsSchema);