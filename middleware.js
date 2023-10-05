const { productSchema } = require("./schemas");

module.exports.validateProduct = (req, res, next) => {
	const { error } = productSchema.validate(req.body);
	console.log(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated())
	{
		req.session.returnTo = req.originalUrl
		return res.redirect("/login");
	}
	next();
};
