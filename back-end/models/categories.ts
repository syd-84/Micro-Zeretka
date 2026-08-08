import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
  category: String,
  name: String,
})

export const categoriesModel = model('categories_goods', categoriesSchema);