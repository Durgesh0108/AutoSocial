const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
	.connect("mongodb://localhost:27017/cart", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		// useFindAndModify: false,
	})
	.then(() => {
		console.log("DB Connected");
	})
	.catch((err) => {
		console.log(err);
	});

const userSchema = new Schema({
	name: String,
	cart: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

const productSchema = new Schema({
	name: String,
	price: Number,
	qty: Number,
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

const addToCart = async () => {
	const user = await User.findById("651de44b0e659e30d85b66dc").populate("cart");
	const product = await Product.findById("651de44b0e659e30d85b66dd");

    console.log(product)
	// if (user.cart.)
	{
		user.cart.map((cartProduct) => {
            if (cartProduct._id === product._id)
            {
                cartProduct.qty += 1;
            }
        });
	}
    user.save();
	// const product = await Product.findOne({ name: "Bag" });

	// product.save();
	// user.cart.push(product);
	// user.save();
};

// addToCart();

const findUser = async () =>
{
    let user = await User.findById("651de44b0e659e30d85b66dc").populate('cart');
    console.log(user)
}

findUser()