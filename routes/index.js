const express = require('express');
const router = express.Router();

const passport = require('passport');

// GET home page - defined route using router.get
router.get('/', function(req, res, next) {
  // Render the index.ejs view and pass any requied data
  // first arg is index, second arg is obj containing data to pass
  // through, title. 
  res.render('index', { title: 'Guitar Fanatics' });
});
router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logout(function () {
		res.redirect('/')
	})
})

// export the router 
module.exports = router;

 