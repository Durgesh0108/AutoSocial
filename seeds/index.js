const mongoose = require("mongoose");
const dotenv = require("dotenv");
const product = require("./product");

const Product = require("../models/productModel");

dotenv.config({ path: "./config.env" });

const DB_URL = process.env.DATABASE_URL;

mongoose.set("strictQuery", true);

mongoose.connect(DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	// useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
	console.log("Connected to MongoDB...");
}); // eslint-disable-line no-unused-vars
const seedDB = async () => {
	await Product.deleteMany({});
	{
		product.map(async (pro) => {
			const newProduct = new Product(pro);
			await newProduct.save();
		});
	}
};

seedDB();

// db.close();
