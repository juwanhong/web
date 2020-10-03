const router = require('express').Router();
const passport = require('passport');
const localStrategy = require('passport-local');

let User = require('../models/user.model');

// register/add
router.route('/').post((req, res) => {
    const { username, password, email } = req.body;
    console.log('/add called');

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            res.json({
                error: 'Already user with username: ${username}'
            })
            res.sendStatus(204);
            console.log('user already exists')
        } else {
            const newUser = new User({
                username: username,
                password: password,
                email: email
            })

            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.sendStatus(200);
                console.log(savedUser);
            })
        }
    })
});

// register/validateUsername
router.route('/validateUsername').post((req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
})

// register/validateEmail
router.route('/validateEmail').post((req, res) => {
    User.findOne({ email: req.body.eamil })
        .then(email => email ? res.sendStatus(204) : res.sendStatus(200))
})

module.exports = router;