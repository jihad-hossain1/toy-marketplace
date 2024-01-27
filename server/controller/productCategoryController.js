const mongoose = require("mongoose");
const Category = require("../models/Category");

const createProductCategory = async (req, res) => {
  // console.log(req.body.category);
  try {
    const category = req.body.category;

    if (!category) {
      return res.status(400).json({ error: "category are required" });
    }

    const already = await Category.findOne({ category });

    if (already) {
      return res.status(400).json({ error: "category already exist" });
    }

    await Category.create({ category });

    return res.status(200).json({ message: "new category added" });
  } catch (error) {
    res.status(500).json({ error: "you got an server error" });
  }
};

const getProductCategories = async (req, res) => {
  // console.log(req.body.category);
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "you got an server error" });
  }
};

const updateProductCategories = async (req, res) => {
  // console.log(req.body.category);
  try {
    const { id } = req.params;
    const { category } = req.body;
    // console.log(id);
    if (!id) {
      return res
        .status(403)
        .json({ error: "product category Id are not found" });
    }
    const existCategory = await Category.findOne({ category });

    if (existCategory) {
      return res.status(400).json({ error: "categroy name already exist" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {
      $set: { category: category },
    });

    return res
      .status(201)
      .json({ message: "category updated successfull", updatedCategory });
  } catch (error) {
    res.status(500).json({ error: "you got an server error" });
  }
};

module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategories,
};
