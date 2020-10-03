const mongoose = require("mongoose");

var User = require("./user.model");

var noteSchema = new mongoose.Schema({
	title: String,
	image: String,
	text: String,
	date: Date,
	username: String,
	imgpng: {
		data: Buffer,
		contentType: String
	}
})


module.exports = mongoose.model("Note", noteSchema);