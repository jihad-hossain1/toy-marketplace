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

router.route("/users/:userId/cart").get(getUserWithCart);

router.route("/users/create-payment-intent").post(paymentByStripe);

router.route("/users/:userId/cart").post(addUserCart);

router
  .route("/users/:userId/cart/increase_cart_product")
  .post(increaseCartProduct);

router
  .route("/users/:userId/cart/decrease_cart_product")
  .post(decreaseCartProduct);

router.route("/users/:userId/:productId").delete(deleteUserProduct);


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
