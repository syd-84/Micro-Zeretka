import { Schema, model } from "mongoose";

const cartGoodsSchema = new Schema({
  id: {
    type: String,
    required: true,
    immutable: true,
  },
  product: {
    id: String,
    name: String,
    description: String,
    imgSrc: String,
    price: Number,
    category: String,
  },
  quantity: Number,
})

export const cartGoodsModel = model('cartGoods', cartGoodsSchema);