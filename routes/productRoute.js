const express = require("express");
const router = express.Router();
const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const { validateProduct, isLoggedIn } = require("./../middleware");

router.get(
	"/",
	catchAsync(async (req, res) => {
		const products = await Product.find({});
		res.render("Product/index", { products });
	})
);

router.get("/new", isLoggedIn, (req, res) => {
	res.render("Product/new");
});

router.post("/", validateProduct, async (req, res) => {
	const newProduct = new Product(req.body.product);
	await newProduct.save();
	res.redirect(`/product/${newProduct._id}`);
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render("Product/show", { product });
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndDelete(id);
	res.redirect("/product");
});

module.exports = router;
