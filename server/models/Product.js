const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    toyTitle: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
    rating: {
      type: Number,
      default: function () {
        return Math.floor(Math.random() * 5 + 1);
      },
    },
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetail",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);


// productSchema.pre("remove", async function (next) {
//   await Comment.deleteMany({ productId: this._id });
//   next();
// });


const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
