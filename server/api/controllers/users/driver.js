const Driver = require('../../../models/users/driver');

const getAll = async (request, response) => {
  let drivers = null;
  try {
    drivers = await Driver
      .find()
      .populate({path: 'classrooms', populate: {path: 'classroom', select: 'hebName'}});

  } catch (err) {
    return response.status(500).json({message: err.message});
  }
  if (!drivers) {
    return response.status(404).json({message: 'No drivers are available.'});
  }
  return response.status(200).json({drivers: drivers});
};

const getById = async (request, response) => {
  const id = request.params.id;
  let driver = null;
  try {
    driver = await Driver.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!driver) {
    return response.status(404).json({message: 'Driver was not found.'});
  }
  return response.status(200).
      json({driver: driver.toObject({getters: true})});
};

const getByName = async (request, response) => {
  const name = request.params.name;
  let driver = null;
  try {
    driver = await Driver.findOne({hebName: name});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!driver) {
    return response.status(404).json({message: 'Driver was not found.'});
  }
  return response.status(200).
      json({driver: driver.toObject({getters: true})});
};

const create = async (request, response) => {
  const values = request.body;
  const driver = new Driver({...values});
  try {
    await driver.save();
  } catch (err) {
    return console.log(err);
  }
  return response.status(201).
      json({driver: driver.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let driver = null;
  try {
    driver = await Driver.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!driver) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    driver[key] = value;
  }

  try {
    await driver.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({driver: driver.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let driver = null;
  try {
    driver = await Driver.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!driver) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await driver.delete();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({message: 'Object was deleted successfully.'});
};

exports.getAll = getAll;
exports.getById = getById;
exports.getByName = getByName;
exports.create = create;
exports.update = update;
exports.remove = remove;
