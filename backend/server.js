var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true }));
app.use(cors());
app.use(express.json());

var noteRouter = require("./routes/notes");
var userRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");

app.use('/users', userRouter);
app.use('/notes', noteRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use(
    session({
        secret: 'this is the random string for hashing',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb connetion established");
})


// Port
const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
    console.log('Connected to port: ' + port);
});