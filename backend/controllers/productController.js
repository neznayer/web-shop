import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
});

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.status(200).json({ message: "product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc Createa product
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample Brand",
        category: "sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description",
    });
    const createdProduct = await product.save();

    res.status(200).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { useFindAndModify: false, new: true }
    );

    if (!updatedProduct) {
        throw new Error("Product not found");
    }

    return res.status(200).json(updatedProduct);
});
