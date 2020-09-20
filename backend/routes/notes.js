const router = require('express').Router();
const fs = require('fs');
let Note = require('../models/note.model');

router.route('/').get((req, res) => {
	Note.find()
		.then(notes => res.json(notes))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
	const title = req.body.title;
	const username = req.body.username;
	const text = req.body.text;
	const date = Date.parse(new Date());
	const image = {
		data: req.body.image,
		contentType: 'image/png'
	};

	const newNote = new Note({
		title,
		username,
		text,
		date,
		image
	});

	newNote.save()
		.then(() => res.json('Note added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;