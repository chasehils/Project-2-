const express = require('express');
const router = express.Router();
// const Guitar = require('../models/guitars');
const guitarsCtrl = require('../controllers/guitars');



router.post('/', guitarsCtrl.createGuitar);
console.log('///post////')

router.get('/', guitarsCtrl.getAllGuitars);
console.log('guitar appppppppppp')
router.post('/:id/review', guitarsCtrl.addReview);
// Route handler for displaying all guitars
// router.get('/guitars', guitarsCtrl.getAllGuitars);
 

// router.get('/new', function(req, res, next) {
//   res.send('resond with a resource');
// });
// Route handler for adding a review to a specific guitar


module.exports = router;
   