import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { goodsModel } from "./models/goods";
import { commentsModel } from "./models/comments";
import { cartGoodsModel } from "./models/cart";

dotenv.config();

export type GoodsType = {
  id: string,
  name: string,
  description: string,
  imgSrc: string,
  price: number,
  category: string,
}

const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.MONGODB_URI!;

const jsonParser = express.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*")
  next();
});

app.use(express.static("../front-end"));

app.get('/goods', async (req, res) => {
  const searchRes = await goodsModel.find({}).select("-_id -createdAt -updatedAt -__v");
  res.end(JSON.stringify(searchRes));
})

app.get('/goods/:id', async (req, res) => {
  const goodsId = req.params.id;
  const searchRes = await goodsModel.where('id').equals(goodsId).select("-_id -createdAt -updatedAt -__v");
  res.end(JSON.stringify(searchRes));
})

app.post('/add_goods', jsonParser, async (req, res) => {
  try {
    const productData = req.body;
    const product = new goodsModel(productData);
    await product.save();
    res.end();
  } catch (error) {
    console.log(error);
  }
})

app.delete('/delete_goods/:id', async (req, res) => {
  const goodsId = req.params.id;
  const result = await goodsModel.findOneAndDelete({ id: goodsId });
  res.end();
})

app.get('/comments', async (req, res) => {
  const searchRes = await commentsModel.find({}).select("-_id -createdAt -updatedAt -__v");
  res.end(JSON.stringify(searchRes));
})

app.post('/add_comment', jsonParser, async (req, res) => {
  try {
    const commentData = req.body;
    const comment = new commentsModel(commentData);
    await comment.save();
    res.end();
  } catch (error) {
    console.log(error);
  }
})

app.delete('/delete_comments/:id', async (req, res) => {
  const goodsId = req.params.id;
  const result = await commentsModel.deleteMany({ productId: goodsId });
  res.end();
})

app.get('/currency', async (req, res) => {
  try {
    const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Помилка завантаження валют:', error);
    res.status(500).json({ error: 'Не вдалося отримати дані про курс валют' });
  }
});

app.get('/cart', async (req, res) => {
  const searchRes = await cartGoodsModel.find({}).select("-_id -createdAt -updatedAt -__v");
  res.end(JSON.stringify(searchRes));
})

app.post('/add_to_cart', jsonParser, async (req, res) => {
  try {
    const cartData = req.body;
    console.log(req.body);
    const cartProduct = new cartGoodsModel(cartData);
    await cartProduct.save();
    res.end();
  } catch (error) {
    console.log(error);
  }
})


const connection = async () => {
  try {
    console.log("connection init");
    await mongoose.connect(DB_CONNECTION);
    console.log("connected");
    app.listen(PORT, () => {
      console.log('server started: ', `http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log(`error: ${error}`);
  }
}

connection();
