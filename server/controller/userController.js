const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// console.log(process.env.STRIPE_KEY);

const createUser = async (req, res) => {
  const isReq = req.body;

  try {
    const isCreate = await User.create(isReq);
    res.status(201).json(isCreate);
  } catch (error) {
    res.status(404).json({ message: "failed to create user", error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "failed to fetch user", error: error });
  }
};

const getUserWithCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cart.product"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const uid = req.params?.id;
  try {
    if (mongoose.Types.ObjectId.isValid(uid)) {
      const user = await User.findById(uid);
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    throw new Error("user not found");
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params?.id;
  try {
    const user = await User.findByIdAndDelete(uid);
    res.json(user);
  } catch (error) {
    return res.json({ message: `something get error ${error}` });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params?.id;
  let body = req.body;
  try {
    const updatetUser = await User.findByIdAndUpdate(uid, {
      $set: body,
    });
    res.status(201).json(updatetUser);
  } catch (error) {
    return res.json({ message: error });
  }
};

const addUserCart = async (req, res) => {
  // console.log(req.params.userId);
  const userId = req.params.userId;
  console.log(userId);
  try {
    const { id, quantity } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(id);
    // console.log(user, product);
    if (!user || !product) {
      return res.status(404).json({ error: "User or product not found" });
    }

    const existingCartItem = user.cart?.find(
      (item) => String(item.product._id) === String(id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ product: product._id, quantity });
    }
    // user.cart.push({ product: product._id, quantity });
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const increaseCartProduct = async (req, res) => {
  const _pid = req.params.userId;
  // console.log("user id : ", _pid);
  const _id = req.body.productId;
  // console.log(id);
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) => item._id == productId);
    // console.log(cartItem);
    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Product not found in the user's cart" });
    }
    // let product;
    // try {
    //   product = await Product.findById(productId);
    //   if (!product) {
    //     throw new Error("Product not found");
    //   }
    // } catch (productError) {
    //   console.error("Error finding product:", productError);
    //   return res.status(404).json({ error: "Product not found" });
    // }
    // if (!product) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    // if (product?.quantity < cartItem?.quantity + 1) {
    //   return res
    //     .status(400)
    //     .json({ error: "Insufficient stock to increase quantity" });
    // }
    // Increase the quantity by 1
    cartItem.quantity += 1;

    await user.save();

    res.json({ message: "Product quantity increased in the user's cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decreaseCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) => item._id == productId);

    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Product not found in the user's cart" });
    }

    // Decrease the quantity by 1 (assuming minimum quantity is 1)
    cartItem.quantity = Math.max(1, cartItem.quantity - 1);

    await user.save();

    res.json({ message: "Product quantity decreased in the user's cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const paymentByStripe = async (req, res) => {
  const { total } = req.body;
  if (total) {
    const amount = parseFloat(total) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
};

const deleteUserProduct = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  // console.log(userId, productId);

  try {
    // Find the user's cart
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Remove the product from the cart
    user.cart.pull(productId);

    // Save the updated cart
    await user.save();

    res.json({ message: "Product removed from the cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserWithCart,
  addUserCart,
  deleteUserProduct,
  increaseCartProduct,
  decreaseCartProduct,
  paymentByStripe,
};
