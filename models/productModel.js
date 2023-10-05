const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, "A Product must have a name"],
	},
	// slug: String,
	description: {
		type: String,
		required: [true, "A Product must have a Description"],
	},
	price: {
		type: Number,
		required: [true, "Product Price is Required"],
	},
	image: {
		type: String,
		// required: [true, "Product must have an Image"],
	},
});

// productSchema.pre("save", function (next) {
// 	this.slug = slug(this.name, { lower: true });
// 	next();
// });

module.exports = mongoose.model("Product", productSchema);
