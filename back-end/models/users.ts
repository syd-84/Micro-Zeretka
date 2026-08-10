import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  password: { type: String, required: true, },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cartGoodsModel'
    }
  ],
  role: {
    type: String,
    enum: ["admin", "custom"],
    default: "custom"
  },
}, { timestamps: true })

export const usersModel = model('users', usersSchema);