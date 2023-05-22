const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

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
    reviews: [reviewSchema] 
  },
  { timestamps: true }
);


module.exports = mongoose.model('Guitar', guitarSchema);