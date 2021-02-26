const Change = require('../../../models/changes/change');

const getAll = async (request, response) => {
  let allChanges = null;
  try {
    allChanges = await Change.find({})
        .populate({path: 'classroom', select: 'hebName'})
        .populate({path: 'newMenu', select: 'hebName'})
        .populate({path: 'oneTimeMenu', select: 'hebName'});
  } catch (err) {
    return response.status(500).json({message: err.message});
  }
  if (!allChanges) {
    return response.status(404).json({message: 'No changes are available.'});
  }
  return response.status(200).json({changes: allChanges});
};

const getById = async (request, response) => {
  const id = request.params.id;
  let menuChangeJob = null;
  try {
    menuChangeJob = await Change.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menuChangeJob) {
    return response.status(404).json({message: 'menuChangeJob was not found.'});
  }
  return response.status(200).
      json({menuChangeJob: menuChangeJob.toObject({getters: true})});
};

const create = async (request, response) => {
  const values = request.body;
  const change = await new Change({...values});

  try {
    await change.save();
  } catch (err) {
    return response.status(500).json({err: err.message});
  }
  return response.status(201).
      json({change: change.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let menuChangeJob = null;
  try {
    menuChangeJob = await Change.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menuChangeJob) {
    return response.status(404).json({message: 'menuChangeJob was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    menuChangeJob[key] = value;
  }

  try {
    await menuChangeJob.save();
  } catch (err) {
    return console.log("Error was occurred.")
  }

  response.status(200).json({menuChangeJob: menuChangeJob.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let menuChangeJob = null;
  try {
    menuChangeJob = await Change.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!menuChangeJob) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await menuChangeJob.delete();
  } catch (err) {
    return console.log("Error was occurred.")
  }

  response.status(200).json({message: "Object was deleted successfully."});
};

exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
