const express = require("express");
const {
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
} = require("../controller/userController");

const router = express.Router();

router.get("/users/:userId/cart", getUserWithCart);

router.post("/users/create-payment-intent", paymentByStripe);

router.post("/users/:userId/cart", addUserCart);

router.post("/users/:userId/cart/increase_cart_product", increaseCartProduct);

router.post("/users/:userId/cart/decrease_cart_product", decreaseCartProduct);

router.delete("/users/:userId/:productId", deleteUserProduct);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);


router.post("/create_user", createUser);

module.exports = router;
