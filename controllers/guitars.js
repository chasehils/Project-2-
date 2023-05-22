const Guitar = require('../models/guitars');


// READ - get all guitars
function index( req, res, next) {
  // In battle-teams there is a field called 'user' 
  // I want to search to find the user that I am passing in
  console.log('this is req.user', req.user)
  Guitar.find({})
    .then(guitars => {
     
      res.render('guitars/guitars', {
        guitars,
        title: 'My Guitars'
      })
      console.log(guitars, 'this is all guitars')
    })
    // If something goes wrong pass it along to the err handler
    .catch(next)
}

console.log('////// something hit ')
// CREATE - add guitar
function create(req, res, next) {
  // from the session 'req.user._id' I would like the req.body to have
  // the current signed in user
  // { name: 'some value', user: 'object id value'}
  req.body.user = req.user._id
  Guitar.create(req.body)
    .then(() => res.redirect('/guitars'))
    .catch(next)
}

console.log('/////this is createGuitar that is hit')
function newGuitar(req, res) {
  res.render('guitars/new', { title: 'New Guitar' })
}

function show(req, res, next) {
  Guitar.findById(req.params.id)
  // () => {}  
  .then(guitar => {
      res.render('guitars/show', {
        guitar,
        title: 'Guitar Details'
      }) 
    })
    .catch(next)
}

console.log('/////this is getGuitarByID that is hit')
// UPDATE - update a guitar
// function updateGuitar(req, res, next) {
//   const guitarId = req.params.id;
//   const { brand, model, year, price } = req.body;

//   Guitar.findByIdAndUpdate(
//     guitarId,
//     { brand, model, year, price },
//     { new: true }
//   )
//     .then((guitar) => {
//       if (!guitar) {
//         return res.status(404).json({ message: 'Guitar not found' });
//       }
//       res.json({ guitar });
//     })
//     .catch(next);
// }
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
// function addReview(req, res, next) {
//   const guitarId = req.params.id;
//   const { comment, stars } = req.body;

//   Guitar.findById(guitarId)
//     .then((guitar) => {
//       if (!guitar) {
//         return res.status(404).json({ message: 'Guitar not found'});
//       }

//       const newReview = {
//         comment,
//         stars
//       };

//       guitar.reviews.push(newReview);

//       return guitar.save();
//     })
//     .then(() => {
//       res.redirect(`/guitars/${guitarId}`);
//     })
//     .catch(next);
// }
console.log('/////this is addreview that is hit')



module.exports = {
  index,
  create,
  newGuitar,
  show,
  // getGuitarById,
  // updateGuitar,
  // deleteGuitar,
  // addReview,
};
