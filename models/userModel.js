const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMOngoose = require("passport-local-mongoose");

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

UserSchema.plugin(passportLocalMOngoose);

module.exports = mongoose.model("User", UserSchema);
