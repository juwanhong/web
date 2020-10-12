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
var cookieParser = require('cookie-parser');
var https = require('https');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true }));
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.22:3000");//.app.localhost");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true)
  next();
});

var noteRouter = require("./routes/notes");
var userRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var authRouter = require("./routes/auth");

mongoose.connect('mongodb://localhost:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb connetion established");
})

app.use(cookieParser())
app.use(
    session({
        secret: 'this is the random string for hashing',
        store: new MongoStore({mongooseConnection: connection}),
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     httpOnly: false,
        // }
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/users', userRouter);
app.use('/notes', noteRouter);
app.use('/auth', authRouter);

app.use('/register', registerRouter);
app.use('/login', loginRouter);



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });






// Port
const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
    console.log('Connected to port: ' + port);
});