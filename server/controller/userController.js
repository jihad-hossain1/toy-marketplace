const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");

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

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserWithCart,
  addUserCart,
};
