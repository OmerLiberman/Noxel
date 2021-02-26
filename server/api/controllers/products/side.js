const Side = require('../../../models/products/side');

const getAll = async (req, res, next) => {
  let sides = null;
  try {
    sides = await Side.find();
  } catch (err) {
    return res.status(500).json({message: 'An error has been occurred.'});
  }
  if (!sides) {
    return res.status(401).json({message: 'No sides.'});
  }
  return res.status(200).json({sides: sides});
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let side = null;
  try {
    side = await Side.findById(id);
  } catch (err) {
    return res.status(500).json({message: 'An error has been occurred.'});
  }
  if (!side) {
    return res.status(401).json({message: 'No such side.'});
  }
  return res.status(200).json({side: side.toObject({getters: true})});
};

const getByHebName = async (req, res, next) => {
  const heb = req.params.englishName;
  let side = null;
  try {
    side = await Side.findOne({hebName: heb});
  } catch (err) {
    return res.status(500).json({message: 'An error has been occurred.'});
  }
  if (!side) {
    return res.status(401).json({message: 'No such side.'});
  }
  return res.status(200).json({side: side.toObject({getters: true})});
};

const getByEngName = async (req, res, next) => {
  const engName = req.params.englishName;
  let side = null;
  try {
    side = await Side.findOne({engName: engName});
  } catch (err) {
    return res.status(500).json({message: 'An error has been occurred.'});
  }
  if (!side) {
    return res.status(401).json({message: 'No such side.'});
  }
  return res.status(200).json({side: side.toObject({getters: true})});
};

const create = async (request, response) => {
  const values = request.body;
  const side = new Side({...values});
  try {
    await side.save();
  } catch (err) {
    return console.log(err);
  }
  return response.status(201).
      json({side: side.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let side = null;
  try {
    side = await Side.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!side) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    side[key] = value;
  }

  try {
    await side.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({side: side.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let side = null;
  try {
    side = await Side.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!side) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await side.delete();
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