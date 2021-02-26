const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
  // English name.
  engName: {type: String, required: false},
  // Hebrew name.
  hebName: {type: String, required: true},
  // Inner code.
  code: {type: String, required: false},
  // English description for the meal.
  engDescription: {type: String, required: false},
  // Hebrew description for the meal.
  hebDescription: {type: String, required: false},
  // The meals in the menu.
  meals: [{type: mongoose.Types.ObjectId, required: false, ref: 'Meal'}],
}, {timestamps: true});

module.exports = mongoose.model('Menu', Menu);