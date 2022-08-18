const router = require('express').Router();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('./controller');

router.post('/register', multer().none(), controller.register);
router.post('/login', multer().none(), controller.login);
router.get('/me', controller.me);
router.post('/logout', controller.logout);

passport.use(new LocalStrategy({ usernameField: 'email' }, controller.localStrategy));

module.exports = router;