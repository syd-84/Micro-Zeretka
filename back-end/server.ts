import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcryptjs";
import open from "open";
import { goodsModel } from "./models/goods.js";
import { commentsModel } from "./models/comments.js";
import { cartGoodsModel } from "./models/cart.js";
import { categoriesModel } from "./models/categories.js";
import { usersModel } from "./models/users.js";
import { checkAuth } from './middleware/auth.middleware.js';

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
const SESSION_KEY = process.env.SESSION_KEY;

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  }
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${HOST}:4200`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.static("../front-end"));



app.get('/goods/categories', async (req, res) => {
  try {
    const searchRes = await categoriesModel.find({});
    res.json(searchRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database error",
    });
  }
});

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

app.post('/goods', async (req, res) => {
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

app.post('/comments', async (req, res) => {
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

app.post('/cart', async (req, res) => {
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

app.post('/cart/:id', async (req, res) => {
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

app.post('/registration', async (req, res) => {
  try {
    const userData = req.body;
    const existUser = await usersModel.findOne({ email: userData.email });

    if (existUser) {
      return res.status(409).json({
        message: "User with this email already exists"
      });
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const user = new usersModel(userData);
    await user.save();
    res.status(201).json({
      message: "Registration was successful"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    req.session.userId = user._id.toString();
    req.session.role = user.role;

    res.status(200).json({
      message: "Successful authorization",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        cart: user.cart,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }

    res.clearCookie('connect.sid');
    return res.status(200).json({ message: "Successful logout" });
  });
});

app.get('/me', checkAuth, async (req, res) => {
  try {
    const user = await usersModel.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      cart: user.cart
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// app.get('/cart', checkAuth, async (req, res) => {
//   try {
//     const userCart = await cartModel.findOne({ userId: req.session.userId });
//     return res.status(200).json(userCart);
//   } catch (err) {
//     return res.status(500).json({ message: "Database error" });
//   }
// });

app.post('/email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailDB = await usersModel.findOne({ email: email });

    if (emailDB) {
      return res.status(409).json({
        exists: true,
        message: "This email is already registered."
      });
    }

    res.status(200).json({
      exists: false,
      message: "Email is available for registration",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error",
    });
  }
});


app.get('/test-secure', checkAuth, (req, res) => {
  return res.json({
    message: "Доступ дозволено!",
    userId: req.session.userId
  });
});




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
