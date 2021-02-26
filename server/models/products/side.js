const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Side = new Schema({
  // English name.
  engName: {type: String, required: false},
  // Hebrew name.
  hebName: {type: String, required: true},
  // Inner code.
  code: {type: String, required: false},
  // category - salad, spread, plastic, bread
  category: {type: String, required: false},
  // English description for the meal.
  engDescription: {type: String, required: false},
  // Hebrew description for the meal.
  hebDescription: {type: String, required: false},
}, {timestamps: true});

module.exports = mongoose.model('Side', Side);