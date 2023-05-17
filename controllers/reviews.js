const Guitar = require('../models/guitars');

// 2 controllers, saveReview, getReviews
// these functions interact with the 'Guitar' model
// to perform necessary operations




// Save review for specific guitar
// finds the guitar by its ID, 
// creates a new review object,
// adds it to the guitar's reviews array,
// saves the changes
function saveReview(req, res, next) {
  const guitarId = req.params.guitarId;
  const comment = req.body.comment;
  const stars = req.body.stars;

  Guitar.findById(guitarId)
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found' });
      }

      const newReview = {
        comment,
        stars
      };
      guitar.reviews.push(newReview);

      return guitar.save();
    })
    .then(() => {
      res.status(201).json({ message: 'Review saved' });
    })
    .catch(next);
}

// Retrieve reviews for a specific guitar
// finds the guitar by its ID and
// returns the reviews associated with it

function getReviews(req, res, next) {
  const guitarId = req.params.guitarId;

  Guitar.findById(guitarId)
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found'});
      }

      res.json({ reviews: guitar.reviews });
    })
    .catch(next);
}


module.exports = {
  saveReview,
  getReviews
}

// adjust routes