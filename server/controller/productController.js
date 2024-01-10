const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductDetail = require("../models/ProductDetail");
const Review = require("../models/Review");

const getProductByEmail = async (req, res) => {
  const email = req.params?.email;
  // console.log(email);
  try {
    const _up = await Product.find();
    const userProducts = _up?.filter((up) => up?.email == email);
    return res.json(userProducts);
    // const
  } catch (error) {
    // return error;
    res.status(401).json({
      message: "problem wiht geting products from server",
      error: error,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
    // const
  } catch (error) {
    res.status(401).json({
      message: "problem wiht geting products from server",
      error: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("details");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    // Create Product details
    const details = new ProductDetail(req.body.details);
    const savedDetails = await details.save();

    // Create Product with Reference to details
    const newProduct = new Product({
      ...req.body,
      details: savedDetails._id,
    });
    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "you got an server error" });
  }
};

const getProducts_page = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  try {
    const startIndex = (page - 1) * limit;

    const total = await Product.countDocuments({});

    const products = await Product.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      data: products,
      limit: startIndex,
      totalProducts: total,
      currentPage: page,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "problem wiht geting blogs from server", error: error });
  }
  // const page = parseInt(req.query.page) || 1;
  // const perPage = parseInt(req.query.perPage) || 10;
  // const filters = {};

  // Handle filters
  // if (req.query.rating) {
  //   filters.rating = parseInt(req.query.rating);
  // }

  // if (req.query.category) {
  //   filters.category = req.query.category;
  // }

  // // Assuming your product schema has a 'price' field
  // if (req.query.sortBy === "price") {
  //   const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  //   filters.price = { $exists: true }; // Exclude products without a price
  //   // Sort by price
  //   const products = await Product.find(filters)
  //     .sort({ price: sortOrder })
  //     .skip((page - 1) * perPage)
  //     .limit(perPage);
  //   res.json(products);
  // } else {
  //   // Default behavior without sorting by price
  //   const products = await Product.find(filters)
  //     .skip((page - 1) * perPage)
  //     .limit(perPage);
  //   res.json(products);
  // }
};

const deleteProductDetailsReview = async (req, res) => {
  // con;
  try {
    const productId = req.params.id;
    // console.log(productId);

    // Find the product to get details and reviews
    const product = await Product.findById(productId).populate("details");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // console.log(product);
    // // Delete the product details
    await ProductDetail.findByIdAndDelete(product.details);

    // // Delete the associated reviews
    await Review.deleteMany({ productId });

    // // Delete the product itself
    const deleteProduct = await Product.findByIdAndDelete(productId);
    // console.log(deleteProduct);
    res
      .status(200)
      .json({ message: "product delete Succcessfull", deleteProduct });
  } catch (error) {
    res.status(401).json({
      message: "problem wiht geting product from server",
      error: error?.message,
    });
  }
};

const deleteProductDetailsReviewEmail = async (req, res) => {
  const email = req.params?.email;
  const id = req.params.id;
  // console.log(id, email);
  try {
    if (id && email) {
      const product = await Product.findById(id).populate("details");
      if (email === product.email) {
        // // Delete the product details
        const deleteDeteial = await ProductDetail.findByIdAndDelete(
          product.details
        );

        // // Delete the associated reviews
        const deleteReview = await Review.deleteMany({ productId: id });

        // // Delete the product itself
        const deleteProduct = await Product.findByIdAndDelete(id);
        // console.log(deleteProduct);
        res
          .status(200)
          .json({
            message: "product delete Succcessfull",
            deleteProduct,
            deleteDeteial,
            deleteReview,
          });
        // res.json(product);
      } else {
        res.status(404).json({ error: "you are not author this product," });
      }
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
    } else {
      res.status(404).json({ error: "product id & email are not match" });
    }
  } catch (error) {
    res.status(500).json({ error: `error from server: ${error}` });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  getProductByEmail,
  getProducts_page,
  deleteProductDetailsReview,
  deleteProductDetailsReviewEmail,
};
