const User = require('../models/users')

// CREATE user
function create(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });
  newUser.save()
  .then((user) => {
    res.status(201).json({ user });
  })
  .catch(next);
}

// READ (get all users)
function show(req, res, next) {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.render('users/show', { user, title: 'User Details' });
    })
    .catch(next);
}
// UPDATE (update user)
function update(req, res, next) {
  const userId = req.params.id;
  const { firstName, lastName, email, password } = req.body;

  User.findById(userId)
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      return user.save();
    })
    .then(() => {
      res.redirect(`/users/${userId}`);
    })
    .catch(next);
} 

// DELETE user
function deleteUser(req, res, next) {
  const userId = req.params.id;
  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect('/users');
    })
    .catch(next);
}

//login function 
function login(req, res, next) {
  // get email/password from the request
  const { email, password } = req.body;

  // login logic here, (eg vaildate credentials)
  
  // redirect user to guitars page after login
  res.redirect('/guitars');

}






module.exports ={
create,
show,
update,
deleteUser,
login
};