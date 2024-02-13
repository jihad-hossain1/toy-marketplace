const express = require("express");
const {
  createProductCategory,
  getProductCategories,
  updateProductCategories,
} = require("../controller/productCategoryController");

const router = express.Router();

router.route("/productCategory").post(createProductCategory);

router.route("/productCategory").get(getProductCategories);

router.route("/productCategory/:id").put(updateProductCategories);

module.exports = router;
