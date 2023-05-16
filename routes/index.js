const express = require('express');
const router = express.Router();

// GET home page - defined route using router.get
router.get('/', function(req, res, next) {
  // Render the index.ejs view and pass any requied data
  // first arg is index, second arg is obj containing data to pass
  // through, title. 
  res.render('index', { title: 'Guitar Fanatics' });
});
// export the router 
module.exports = router;

 