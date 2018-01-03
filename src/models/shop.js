const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  iso: {
    type: String,
    minlength: 3,
    maxlength: 3,
    required: true,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
    required: true,
  },
  lng: {
    type: Number,
    min: -180,
    max: 180,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ads1: {
    type: String,
    required: false,
  },
  ads2: {
    type: String,
    required: false,
  },
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
