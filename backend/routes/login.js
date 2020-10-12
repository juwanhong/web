const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');

let User = require('../models/user.model');

// passport.initialize()
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route('/').post(
    (req, res, next) => {
        console.log(req.body);
        console.log('next()')
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
        res.send(userInfo);
    }
)

router.route('/user').get(
    (req, res, next) => {
        console.log('user: ')
        console.log(req.user)
        if (req.user) {
            return res.json({ username: req.user.username })
        } else {
            return res.json({ username: null })
        }
    }
)


module.exports = router;