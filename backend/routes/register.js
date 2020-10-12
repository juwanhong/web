const router = require('express').Router();
const passport = require('passport');
const localStrategy = require('passport-local');

let User = require('../models/user.model');

// register/add
router.route('/').post((req, res) => {
    const { username, password, email } = req.body;
    console.log('/add called');

    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            console.log('user already exists')
            return res.json({
                error: 'Already user with username: ${username}'
            })
        }
        const newUser = new User({
            'username': username,
            'password': password,
            'email': email
        })
        console.log(newUser);

        User.register(newUser, password, (err, user) => {
            if (err) console.log(err)
            return res.json(newUser)
        })
        // newUser.save((err, savedUser) => {
        //     if (err) return res.json(err);
        //     return res.json(savedUser)
            
        // })
    })
});

module.exports = router;