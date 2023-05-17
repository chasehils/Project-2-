// define routes for saving reviews and retrieving reviews for a specific guitar.
const express = require('express');
const router = express.Router();
const Guitar = require('../models/guitars');

// Save a review for a specific guitar
router.post('/', function(req, res, next) {
  const guitarId = req.params.guitarId;
  const comment = req.body.comment;
  const stars = req.body.stars;

  Guitar.findById(guitarId)
  .then(function(guitar) {
    const newReview = {
      comment,
      stars
    };
    guitar.reviews.push(newReview);
    return guitar.save();
  })
  .then(function() {

  })
  .catch(function(err) {
    next(err);
  });
});

// Retrieve reviews for a specific guitar
router.get('reviews/:guitarId', function(req, res, next) {
  const guitarId = req.params.guitarId;
  
  Guitar.findById(guitarId)
    .then(function(guitar) {
      res.render('reviews', { guitar });
    })
    .catch(function(err) {
      next(err);
    });
});