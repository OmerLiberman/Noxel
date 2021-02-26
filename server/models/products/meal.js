const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Meal = new Schema({
  // English name.
  engName: {type: String, required: false},
  // Hebrew name.
  hebName: {type: String, required: true},
  // Inner code.
  code: {type: String, required: false},
  // Kosher category type - meat / vegi.
  kosherCategory: {type: String, required: false},
  // English description for the meal.
  engDescription: {type: String, required: false},
  // Hebrew description for the meal.
  hebDescription: {type: String, required: false},
  // The meal ingredients.
  ingredients: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Ingredient',
    }],
}, {timestamps: true});

module.exports = mongoose.model('Meal', Meal);