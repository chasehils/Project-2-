const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');

// google oauth authentication
router.get('/auth/google', passport.authenticate('google', 
{ scope: ['profile', 'email']}));
//google oauth cb route
router.get('/auth/google/callback', passport.authenticate('google', 
{ failureRedirect: '/login' }), (req, res) => {
  res.redirect('/guitars');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// Login route
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login'});
});

// link the sign up page 
// using the /signup path to render the 'signup.ejs'
// view file 
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Sign Up'});
});

//register route
router.post('/register', function(req, res, next) {
  usersCtrl.register(req, res, next);
});


// create router
router.post('/users', usersCtrl.create);
// read router
router.get('/:id', usersCtrl.show);
// update router
router.put('/:id', usersCtrl.update);
// delete router
router.delete('/:id', usersCtrl.deleteUser);
//login router
router.post('/login', usersCtrl.login);
// User Profile router
router.get('/profile', usersCtrl.getProfile);

module.exports = router;