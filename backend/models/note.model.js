const mongoose = require("mongoose");

var User = require("./user.model");

var noteSchema = new mongoose.Schema({
	title: String,
	image: {
		data: Buffer,
		contentType: String},
	text: String,
	date: Date,
	username: String
})


module.exports = mongoose.model("Note", noteSchema);