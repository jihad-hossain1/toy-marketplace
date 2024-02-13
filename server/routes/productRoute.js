const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  getProductByEmail,
  getProducts_page,
  deleteProductDetailsReview,
  deleteProductDetailsReviewEmail,
} = require("../controller/productController");

const router = express.Router();

router.route("/products").get(getProducts);

router.route("/products_page").get(getProducts_page);

router.route("/products/:id").get(getProductById);

router.route("/userProducts/:email").get(getProductByEmail);

router.route("/products").post(createProduct);

router.route("/products/:id").delete(deleteProductDetailsReview);

router
  .route("/products_email/:id/user/:email")
  .delete(deleteProductDetailsReviewEmail);

module.exports = router;
