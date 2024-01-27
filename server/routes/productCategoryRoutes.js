const express = require("express");
const {
  createProductCategory,
  getProductCategories,
  updateProductCategories,
} = require("../controller/productCategoryController");

const router = express.Router();

router.post("/productCategory", createProductCategory);

router.get("/productCategory", getProductCategories);

router.put("/productCategory/:id", updateProductCategories);

module.exports = router;
