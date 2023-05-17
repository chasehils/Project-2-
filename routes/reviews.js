const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// Save a review for a specific guitar
router.post('/guitars/:guitarId/reviews', reviewsCtrl.saveReview);

// Retrieve reviews for a specific guitar
router.get('/guitars/:guitarId/reviews', reviewsCtrl.getReviews);

module.exports = router;
