const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserWithCart,
  addUserCart,
} = require("../controller/userController");

const router = express.Router();

router.get("/users", getUsers);

router.get("/users/:userId/cart", getUserWithCart);

router.post("/users/:userId/cart", addUserCart);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/create_user", createUser);

module.exports = router;
