const mongoose = require("mongoose");

const productDetailSchema = mongoose.Schema({
  productDetails: { type: Object },
  size: { type: Object },
  images: { type: Object },
  offers: { type: Object },
  specifications: { type: Object },
  colors: { type: Object },
  seller: { type: Object },
  materialCare: { type: Object },
});

const ProductDetail =
  mongoose.models.ProductDetail ||
  mongoose.model("ProductDetail", productDetailSchema);

module.exports = ProductDetail;
