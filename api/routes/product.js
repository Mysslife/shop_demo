const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const Product = require("../models/Product");
const CryptoJS = require("crypto-js");

// CREATE:
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE:
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE:
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE PRODUCT:
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...info } = product._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS WITH CONDITION OF QUERY:
router.get("/", async (req, res) => {
  const newQueryValue = req.query.new;
  const categoryQueryValue = req.query.category;

  try {
    let products;
    if (newQueryValue) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (categoryQueryValue) {
      products = await Product.find({
        categories: { $in: [categoryQueryValue] },
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
