const Menu = require('../../../models/products/menu');

const getAll = async (request, response) => {
  let menus = null;
  try {
    menus = await Menu.find().populate('meals');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menus) {
    return response.status(401).json({message: 'No menus.'});
  }
  return response.status(200).json({menus: menus});
};

const getById = async (request, response) => {
  const id = request.params.id;
  let menu = null;
  try {
    menu = await Menu.findById(id).populate('meals');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menu) {
    return response.status(401).json({message: 'No such menu.'});
  }
  return response.status(200).json({menu: menu.toObject({getters: true})});
};

const getByHebName = async (request, response) => {
  const heb = request.params.hebName;
  let menu = null;
  try {
    menu = await Menu.findOne({hebName: heb}).populate('meals');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menu) {
    return response.status(401).json({message: 'No such menu.'});
  }
  return response.status(200).json({menu: menu.toObject({getters: true})});
};

const getByEngName = async (request, response) => {
  const eng = request.params.englishName;
  let menu = null;
  try {
    menu = await Menu.findOne({engName: eng}).populate('meals');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menu) {
    return response.status(401).json({message: 'No such menu.'});
  }
  return response.status(200).json({menu: menu.toObject({getters: true})});
};

const create = async (request, response) => {
  const values = request.body;
  const menu = new Menu({...values});
  try {
    await menu.save();
  } catch (err) {
    return console.log(err);
  }
  return response.status(201).
      json({menu: menu.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let menu = null;
  try {
    menu = await Menu.findById(id).populate('meals');
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menu) {
    return response.status(404).json({message: 'Menu was not found.'});
  }

  let newMeals = [];
  for (const meal of values.meals) {
    newMeals.push(meal);
  }

  for (const [key, value] of Object.entries(values)) {
    if (key !== 'meals') {
      menu[key] = value;
    }
  }
  menu.meals = newMeals;

  try {
    await menu.save();
    menu = await Menu.findById(id).populate('meals')
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({menu: menu.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let menu = null;
  try {
    menu = await Menu.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menu) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await menu.delete();
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

