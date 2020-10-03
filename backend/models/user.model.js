const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 20
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 20
	},
	email: {
		type: String,
		required: true,
		minlegnth: 4,
		maxlength: 20
	},
	date: {
		type: Date,
		default: Date.now
	}
})

userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainPassword => {
		return bcrypt.hashSync(plainPassword, 10)
	}
}

userSchema.pre('save', (next) => {
	// if (!this.password) {
	// 	console.log('no password provided');
	// 	next();
	// } else {
		console.log('hashPassword in pre save');
		this.password = this.hashPassword(this.password);
		next();
	// }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);