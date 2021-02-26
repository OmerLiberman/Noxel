const Ingredient = require('../../../models/products/ingredient');

const getAll = async (request, response) => {
  let ingredients = null;
  try {
    ingredients = await Ingredient.find();
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredients) {
    return response.status(401).json({message: 'No ingredients.'});
  }
  return response.status(200).json({ingredients: ingredients});
};

const getById = async (request, response) => {
  const id = request.params.id;
  let ingredient = null;
  try {
    ingredient = await Ingredient.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredient) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({ingredient: ingredient.toObject({getters: true})});
};

const getByHebName = async (request, response) => {
  const heb = request.params.englishName;
  let ingredient = null;
  try {
    ingredient = await Ingredient.findOne({hebName: heb});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredient) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({ingredient: ingredient.toObject({getters: true})});
};

const getByEngName = async (request, response) => {
  const engName = request.params.englishName;
  let ingredient = null;
  try {
    ingredient = await Ingredient.findOne({engName: engName});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredient) {
    return response.status(401).json({message: 'No such ingredient.'});
  }
  return response.status(200).json({ingredient: ingredient.toObject({getters: true})});
};

const create = async (request, response) => {
  const values = request.body;
  const ingredient = new Ingredient({...values});
  try {
    await ingredient.save();
  } catch (err) {
    return console.log(err);
  }
  return response.status(201).
      json({ingredient: ingredient.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let ingredient = null;
  try {
    ingredient = await Ingredient.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredient) {
    return response.status(404).json({message: 'Ingredient was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    ingredient[key] = value;
  }

  try {
    await ingredient.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({ingredient: ingredient.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let ingredient = null;
  try {
    ingredient = await Ingredient.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!ingredient) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await ingredient.delete();
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