const User = require('../models/user')
// bcrypt - Blowfish crypt - used for library hashing passwords
// bcrypt securely hashes the user's password before storing
// it in the database - add extra layer of security by ensuring 
// the passwords are not stored in plain text and are not easily 
// reverisble even if the database is compromised. 
const bcrypt = require('bcrypt');

// register user funciton
function register(req, res, next){
  const { email, password } = req.body;
  //check to see if email exists in db
    User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already registered'});
        }
        // add email and password
        const newUser = new User({ email, password });
        return newUser.save(); // save new user to the database
      })
      .then(() => {
        res.status(201).json({ message: 'User registerd successfully'})
      })
      .catch(next);

}

// CREATE user
function create(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  //hash pasword
  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if(err) {
      return next(err);
    }
        // create a new user with hashed p/w
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword
        });
        newUser.save()
        .then((user) => {
          res.status(201).json({ user });
        })
        .catch(next);
  });


  
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
    User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password'});
      }
      //compare provided p/w with hashed p/w stored in the db
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return next(err);
        }
        if (!result) {
          return res.status(401).json({ message: 'Invalid email or password'});
        }
        // if login info is valid, set the user session or generate an 
        // authentication token
        req.session.userId = user._id;

        res.redirect('/guitars'); // redirect to guitars page after login
      });
    })
    .catch(next);
}

function getProfile(req, res) {
  const currentUser = req.user;
  res.render('profile', { currentUser });
}









module.exports ={
register,
create,
show,
update,
deleteUser,
login,
getProfile,
};