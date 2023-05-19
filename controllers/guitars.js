const Guitar = require('../models/guitars');
const { validateImageLink } = require('./validation');

console.log('////// something hit ')
// CREATE - add guitar
function createGuitar(req, res, next) {
  const { brand, model, year, price, imageLink } = req.body;

  const isValidImageLink = validateImageLink(imageLink);
    if (!isValidImageLink) {
      return res.status(400).json({ message: 'Invalid image link' });
    }
  const newGuitar = new guitar ({
    brand,
    model,
    year,
    price,
    imageLink,
  }); 

  newGuitar
    .save()
    .then((guitar) => {
      console.log('new guitar saved', guitar)
      res.status(201).json({ guitar, imageLink });
    })
    .catch(next);
}
console.log('/////this is createGuitar that is hit')
// READ - get all guitars
function getAllGuitars(req, res, next) {
 if (!req.user) {
  return res.status(401).json({ message: 'Unauthorized' });
 }
 Guitar.find({ user: req.user._id })
  .then((guitars) => {
    res.render('guitars', {
      guitars,
      title: 'All Guitars'
    });
  })
  .catch(next);
}

// READ - get a specific guitar
function getGuitarById(req, res, next) {
  const guitarId = req.params.id;

  Guitar.findById(guitarId)
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found' });
      }
      res.json({ guitar });
    })
    .catch(next);
}
console.log('/////this is getGuitarByID that is hit')
// UPDATE - update a guitar
function updateGuitar(req, res, next) {
  const guitarId = req.params.id;
  const { brand, model, year, price } = req.body;

  Guitar.findByIdAndUpdate(
    guitarId,
    { brand, model, year, price },
    { new: true }
  )
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found' });
      }
      res.json({ guitar });
    })
    .catch(next);
}
console.log('/////this is updateGuitar that is hit')
// DELETE - delete a guitar
function deleteGuitar(req, res, next) {
  const guitarId = req.params.id;

  Guitar.findByIdAndRemove(guitarId)
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found' });
      }
      res.json({ message: 'Guitar deleted successfully' });
    })
    .catch(next);
}
console.log('/////this is deleteGuitarthat is hit')
function addReview(req, res, next) {
  const guitarId = req.params.id;
  const { comment, stars } = req.body;

  Guitar.findById(guitarId)
    .then((guitar) => {
      if (!guitar) {
        return res.status(404).json({ message: 'Guitar not found'});
      }

      const newReview = {
        comment,
        stars
      };

      guitar.reviews.push(newReview);

      return guitar.save();
    })
    .then(() => {
      res.redirect(`/guitars/${guitarId}`);
    })
    .catch(next);
}
console.log('/////this is addreview that is hit')



module.exports = {
  createGuitar,
  getAllGuitars,
  getGuitarById,
  updateGuitar,
  deleteGuitar,
  addReview,
};
