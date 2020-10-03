const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local');

let User = require('../models/user.model');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route('/').post((req, res, next) => {
	console.log(req.body);
	next();
	console.log('next()');
	passport.authenticate('local'),
		(err, user, info) => {
			if (err) console.log(err);
			console.log('logged in', req.user);
			var userInfo = {
				username: req.user.username
			};
			res.send(userInfo);
	}
})

module.exports = router;