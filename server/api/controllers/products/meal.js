const Meal = require('../../../models/products/meal');

const getById = async (request, response) => {
  const id = request.params.id;
  let meal = null;
  try {
    meal = await Meal.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meal) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({meal: meal.toObject({getters: true})});
};

const getByEngName = async (request, response) => {
  const engName = request.params.engName;
  let meal = null;
  try {
    meal = await Meal.findOne({engName: engName});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meal) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({meal: meal.toObject({getters: true})});
};

const getByHebName = async (request, response) => {
  const heb = request.params.heb;
  let meal = null;
  try {
    meal = await Meal.findOne({hebName: heb});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meal) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({meal: meal.toObject({getters: true})});
};

const getAll = async (request, response) => {
  let meals = null;
  try {
    meals = await Meal.find().populate('ingredients');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meals) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({meals: meals});
};

const create = async (request, response) => {
  const values = request.body;
  const newMeal = new Meal({...values});

  try {
    await newMeal.save();
  } catch (err) {
    return response.status(500).json({message: 'Could not create meal.'});
  }
  return response.status(201).
      json({meal: newMeal.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let meal = null;
  try {
    meal = await Meal.findById(id).populate('ingredients');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meal) {
    return response.status(404).json({message: 'Meal was not found.'});
  }

  let newIngredients = [];
  for (const ingredient of values.ingredients) {
    newIngredients.push(ingredient);
  }

  for (const [key, value] of Object.entries(values)) {
    if (key !== 'ingredients') {
      meal[key] = value;
    }
  }
  meal.ingredients = newIngredients;

  try {
    await meal.save();
    meal = await Meal.findById(id).populate('ingredients');
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({meal: meal.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let meal = null;
  try {
    meal = await Meal.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!meal) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await meal.delete();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({message: 'Object was deleted successfully.'});
};

exports.getAll = getAll;
exports.getByEngName = getByEngName;
exports.getByHebName = getByHebName;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;