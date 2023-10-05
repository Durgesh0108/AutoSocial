const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require('./utils/ExpressError');

// const Product = require("./models/productModel");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const User = require("./models/userModel");

const app = express();

dotenv.config({ path: "./config.env" });

const DB_URL = process.env.DATABASE_URL;

mongoose.set("strictQuery", true);

mongoose
	.connect(DB_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("DB Connected");
	});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // used for req.body
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const secret = "thisshouldbeabettersecret!";

// const store = new MongoDBStore({
// 	url: dbUrl,
// 	secret,
// 	touchAfter: 24 * 60 * 60,
// });

// store.on("error", function (e) {
// 	console.log("SESSION STORE ERROR", e);
// });

const sessionConfig = {
	// store,
	name: "session",
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.get("/cat", (req, res) => {
	res.send("cat");
});

app.use("/", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
	res.render("home");
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!";
	res.status(statusCode).render("error", { err });
});

app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
