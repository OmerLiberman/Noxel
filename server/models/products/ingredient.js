const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredient = new Schema({
  // English name.
  engName: {type: String, required: true},
  // Hebrew name.
  hebName: {type: String, required: true},
  // Inner code.
  code: {type: String, required: true},
  // Unit to measure (gram, kg, liter)
  unit: {type: String, required: false},
  // Kosher category type - meat / vegi.
  kosherCategory: {type: String, required: false},
}, {timestamps: true});

module.exports = mongoose.model('Ingredient', Ingredient);