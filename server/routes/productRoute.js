const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  getProductByEmail,
  getProducts_page,
} = require("../controller/productController");

const router = express.Router();

router.get("/products", getProducts);

router.get("/products_page", getProducts_page);

router.get("/products/:id", getProductById);

router.get("/userProducts/:email", getProductByEmail);

router.post("/products", createProduct);

module.exports = router;
