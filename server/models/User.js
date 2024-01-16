const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    pic: { type: String },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    deliveries: [
      {
        products: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
          },
        ],
        transactionId: {
          type: String,
        },
        deliveryAddress: {
          street: { type: String },
          city: { type: String },
          zipCode: { type: String },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
