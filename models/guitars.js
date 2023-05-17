const mongoose = require('mongoose')

const guitarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //guitar type
  type: {
    type: String,
    enum: ['acoustic, electric, bass'],
    required: true,
  },
  // this allows for 6 string or 12 string type of guitar
  strings: {
    type: Number,
    required: true,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
},
  {}
);

module.exports = mongoose.model('Guitar', guitarSchema);