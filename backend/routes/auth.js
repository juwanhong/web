const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');

// passport.initialize()
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// auth/register
router.route('/register').post((req, res) => {
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

// auth/login
router.route('/login').post(
    (req, res, next) => {
        console.log(req.body);
        console.log('next()')
        next();
    },
    passport.authenticate('local'),
    (req, res, next) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        req.login(req.user, (err) => {
            if (err) { return res.redirect('/auth/login') }
            const body = { username: req.user.username }
            var token = jwt.sign({ user: body }, 'secret')
            console.log('logged in', req.user)
            // console.log(token)
            res.header({'access-control-expose-headers' : 'Set-Cookie'})
            return res.json({
                username: req.user.username,
                session: req.session,
                token
            });
        });
    }
)

// auth/logout
router.route('/logout').post(
    (req, res) => {
        req.session.destroy()
        res.clearCookie('connect.sid')
        return res.json({ msg: 'logged out' })
    })

// auth/user
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