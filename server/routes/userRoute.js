const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  getUserWithCart,
  addUserCart,
  deleteUserProduct,
  increaseCartProduct,
  decreaseCartProduct,
  paymentByStripe,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} = require("../controller/userController");
const { upload } = require("../middleware/multer.middleware");
const verifyJWT = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users/:userId/cart", getUserWithCart);

router.post("/users/create-payment-intent", paymentByStripe);

router.post("/users/:userId/cart", addUserCart);

router.post("/users/:userId/cart/increase_cart_product", increaseCartProduct);

router.post("/users/:userId/cart/decrease_cart_product", decreaseCartProduct);

router.delete("/users/:userId/:productId", deleteUserProduct);


router.route("/users/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/users/login").post(loginUser);

// secure route

router.route("/users/logout").post(verifyJWT, logoutUser);

router.route("/users/current-user").get(verifyJWT, getCurrentUser);
router.route("/users/current-user").get(getCurrentUser);



module.exports = router;
