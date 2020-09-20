var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

var noteRouter = require("./routes/notes");
var userRouter = require("./routes/users");

app.use('/users', userRouter);
app.use('/notes', noteRouter);

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({storage: storage});

mongoose.connect('mongodb://localhost:27017/web', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("mongodb connetion established");
})

// app.get('/', (req, res) => {
// 	Note.find({}, (err, items) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			res.render('notes/new', {items: items});
// 		}
// 	});
// });

// app.post('/', upload.single('image'), (req, res, next) => {
// 	var obj = {
// 		username : req.body.username,
// 		date : Date.parse(req.body.date),
// 		text : req.body.text,
// 		image : {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}

// 	Note.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			item.save();
// 			res.redirect('/');
// 		}
// 	})
// })



// Port
const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
	console.log('Connected to port: ' + port);
});