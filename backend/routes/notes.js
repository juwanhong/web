const router = require('express').Router();
const fs = require('fs');
const tesseract = require('node-tesseract-ocr') 
const multer = require('multer')
const path = require('path')

let Note = require('../models/note.model');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'))
	},
	filename: function(req, file, cb) {
		cb(null, 'temp.png')
	}
})

const upload = multer({
	storage: storage,
})

const tesseract_config = {
	lang: 'eng',
	oem: 1,
	psm: 3,
}

router.route('/').get((req, res) => {
	Note.find()
		.then(notes => res.json(notes))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post(upload.single('imgpng'), (req, res) => {
	const title = req.body.title;
	const username = req.body.username;
	const text = req.body.text;
	const date = Date.parse(new Date());
	const image = req.body.image;
	// const imgpng = {
	// 	data: req.body.imgpng,
	// 	contentType: 'image/png'
	// }
	console.log('test')
	const imgpng = req.file
	console.log(imgpng)
	
	// const buf = Buffer.from(imgpng, 'base64')
	// console.log('buf: ', buf)

	tesseract.recognize('./uploads/temp.png', tesseract_config)
		.then(text => {
			console.log('Result: ', text)
		})
		.catch(err => {
			console.log(err.message)
		})
		// contentType: 'string'

	const newNote = new Note({
		title,
		username,
		text,
		date,
		image,
		imgpng
	});

	console.log(newNote)

	newNote.save()
		.then(() => res.json('Note added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;