// define routes for displaying guitars and adding reviews.
const express = require('express');
const router = express.Router();
const Guitar = require('../models/guitars');

// use then/catch to hand the promises reutrned by mongoose queries


// route to Display all guitars
// route handler for displaying all guitars uses
router.get('/guitars', function(req, res, next) {
  Guitar.find()
  // .then to handle the success case where we 
  .then(function(guitars) {
      // render the 'guitars.ejs' view with guitars data
      res.render('guitars', { guitars });
    })
    // handles any errors that may occur
    .catch(function(err) {
      next(err);
    });
});

// Add a review to a specific guitar
router.post('.guitars/:id/review', function(req, res, next) {
  const { id } = req.paramsl
  const { comment, stars } =req.body;
  // route handler for adding a review to a specific guitar uses .then
  // to chain multiple promise-based operations together


  // find the guitar,
  Guitar.findById(id)
  .then(function(guitar) {
    // create a new review,
    const newReview = {
      comment,
      stars
    };
    // push it to the 'reviews' array,
    guitar.reviews.push(newReview);
    // save the updated guitar,
    return guitar.save();
  })
  .then(function() {
    // redirect the user to the guitar details page
    res.redirect(`/guitars/${id}`);
  })
  // .catch to catch any errors
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;