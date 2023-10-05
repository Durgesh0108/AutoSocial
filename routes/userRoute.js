const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");

router.get("/register", (req, res) => {
	res.render("user/register");
});

router.post(
	"/register",
	catchAsync(async (req, res, next) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, (err) => {
				if (err) return next(err);
				console.log(registeredUser);
				res.redirect("/product");
			});
		} catch (e) {
			res.redirect("/register");
		}
	})
);


router.get("/login", (req, res) => {
	res.render("user/login");
});

router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	async (req, res) => {
        const redirectUrl = req.session.returnTo || "/product";
        delete req.session.returnTo
		res.redirect(redirectUrl);
	}
);



router.get("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/product");
	});
});

module.exports = router;