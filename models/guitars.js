const mongoose = require('mongoose')

const guitarSchema = new mongoose.Schema({
  name: {
    // type will be a string
    type: String,
    // this will be required in order to make this document 
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
  
},{})