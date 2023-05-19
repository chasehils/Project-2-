const express = require('express');
const router = express.Router();
const Guitar = require('../models/guitars');
const guitarsCtrl = require('../controllers/guitars');

// Route handler for displaying all guitars
router.get('/guitars', guitarsCtrl.getAllGuitars);



// Route handler for adding a review to a specific guitar
router.post('/guitars/:id/review', guitarsCtrl.addReview);

module.exports = router;
