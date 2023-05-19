const Guitar = require('../models/guitars');

// CREATE - add guitar
function createGuitar(req, res, next) {
  const { brand, model, year, price } = req.body;
  const newGuitar = new Guitar({
    brand,
    model,
    year,
    price
  });

  newGuitar
    .save()
    .then((guitar) => {
      res.status(201).json({ guitar });
    })
    .catch(next);
}

// READ - get all guitars
function getAllGuitars(req, res, next) {
  Guitar.find({ user: req.user._id })
        .then(guitar => {
            res.render('guitars', {
                guitar,
                title: 'All Guitars'
            })
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

module.exports = {
  createGuitar,
  getAllGuitars,
  getGuitarById,
  updateGuitar,
  deleteGuitar,
  addReview,
};
