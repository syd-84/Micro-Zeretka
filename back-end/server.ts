import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import open from "open";
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
const HOST = process.env.HOST;
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
  try {
    const searchRes = await goodsModel.find({}).sort({ _id: -1 }).select("-_id -createdAt -updatedAt -__v");
    res.json(searchRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database error",
    });
  }
});

app.get('/goods/:id', async (req, res) => {
  try {
    const searchRes = await goodsModel.findOne({ id: req.params.id }).select("-_id -createdAt -updatedAt -__v");

    if (!searchRes) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(searchRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database error",
    });
  }
})

app.post('/goods', jsonParser, async (req, res) => {
  try {
    const product = new goodsModel(req.body);
    await product.save();
    res.status(201).json({
      message: "Product added successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.delete('/goods/:id', async (req, res) => {
  try {
    const result = await goodsModel.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const searchRes = await commentsModel.find({}).select("-_id -createdAt -updatedAt -__v");
    res.json(searchRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database error",
    });
  }
})

app.post('/comments', jsonParser, async (req, res) => {
  try {
    const commentData = req.body;
    const comment = new commentsModel(commentData);
    await comment.save();
    res.status(201).json({
      message: "Comment added successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
})

app.delete('/comments/:id', async (req, res) => {
  try {
    const result = await commentsModel.deleteMany({ productId: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Comments not found" });
      return;
    }
    res.json({
      message: "Comments deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
})

app.get('/currency', async (req, res) => {
  try {
    const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "External API error",
    });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const searchRes = await cartGoodsModel.find({}).select("-_id -createdAt -updatedAt -__v");
    res.json(searchRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database error",
    });
  }
})

app.post('/cart', jsonParser, async (req, res) => {
  try {
    const cartData = req.body;
    const cartProduct = new cartGoodsModel(cartData);
    await cartProduct.save();
    res.status(201).json({
      message: "Product added to cart"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
})

app.delete('/cart/product/:id', async (req, res) => {
  try {
    const result = await cartGoodsModel.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.delete('/cart', async (req, res) => {
  try {
    const result = await cartGoodsModel.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Cart is already empty"
      });
    }

    res.json({
      message: "Products deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
})

app.post('/cart/:id', jsonParser, async (req, res) => {
  try {
    const cartId = req.params.id;
    const cartData = req.body;

    const cartProduct = await cartGoodsModel.findOneAndUpdate(
      { id: cartId },
      { $set: { product: cartData.product, quantity: cartData.quantity } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!cartProduct) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    res.status(200).json({
      message: "Product updated in cart"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
})


const connection = async () => {
  try {
    console.log("connection init");
    await mongoose.connect(DB_CONNECTION);
    console.log("connected");
    app.listen(PORT, () => {
      const url = `${HOST}:${PORT}`;
      console.log('server started: ', `${url}`);
      // open(url);
    });

  } catch (error) {
    console.log(`error: ${error}`);
  }
}

connection();
