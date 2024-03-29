import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
    //pagination

    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? // if keyword is empty, get all products
          {
              name: {
                  $regex: req.query.keyword,
                  $options: "i", //case insensitive
              },
          }
        : {};
    // end/point??lalala

    const count = await Product.countDocuments({ ...keyword }); //count of products
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
// @route PUT /api/products/:id/reviews
// @access Private
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

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
export const createrProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review created" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
});
