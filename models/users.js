const mongoose = require('mongoose')
const Schema = mongoose.Schema
// define userSchema with email/password
const userSchema = new Schema({
  email: 
  {
    type: String,
    required: true,
    unique: true,
  },
  password:
  {
    type: String,
    required: true,
  }
});
// placed at the bottom to make sure that 'User' model is defined
// and exported after the schema is defined, if you try and import
// model before its defined, get an error
const User = mongoose.model('User', userSchema); 
// at the borttom ensures that that it is defined after schema
// it will now be available for use in other files

module.exports = mongoose.model('User', userSchema)