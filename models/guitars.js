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
    imageLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;