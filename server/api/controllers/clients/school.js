const School = require('../../../models/clients/school');
const Payer = require('../../../models/clients/payer');
const ClassRoom = require('../../../models/clients/class-room');

const getAll = async (request, response) => {
  let schools = null;
  try {
    schools = await School.find();
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!schools) {
    return response.status(404).json({message: 'No schools are available.'});
  }
  return response.status(200).json({schools: schools});
};

const getById = async (request, response) => {
  const id = request.params.id;
  let school = null;
  try {
    school = await School.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!school) {
    return response.status(404).json({message: 'School was not found.'});
  }
  return response.status(200).
      json({school: school.toObject({getters: true})});
};

const getByHebName = async (request, response) => {
  const heb = request.params.heb;
  let school = null;
  try {
    school = await School.findOne({hebName: heb});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!school) {
    return response.status(404).json({message: 'School was not found.'});
  }
  return response.status(200).
      json({school: school.toObject({getters: true})});
};

const getByEngName = async (request, response) => {
  const eng = request.params.engName;
  let school = null;
  try {
    school = await School.findOne({engName: eng});
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!school) {
    return response.status(401).json({message: 'No such school.'});
  }
  return response.status(200).json({school: school.toObject({getters: true})});
};

const create = async (request, response, next) => {
  const values = request.body;

  const school = new School({...values});

  // Save school.
  try {
    school.save();
  } catch (err) {
    return response.json(500).json({message: 'Could not create payer.'});
  }

  // Set payer
  if (values.payer) {
    let _payer;
    try {
      _payer = await Payer.findById(values.payer);
    } catch (err) {
      return next(err);
    }
    if (_payer) {
      _payer.schools.push(school);
      await _payer.save();
    }
  }

  // Set classrooms
  if (values.classrooms) {
    if (values.classrooms.length > 0) {
      for (let ind in values.classrooms) {
        let classroom = await ClassRoom.findById(values.classrooms[ind]);
        classroom.school = school;
        await classroom.save();
      }
    }
  }

  return response.status(201).json({school: school.toObject({getters: true})});
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let school = null;
  try {
    school = await School.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!school) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    school[key] = value;
  }

  try {
    await school.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({school: school.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let school = null;
  try {
    school = await School.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!school) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await school.delete();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({message: 'Object was deleted successfully.'});
};

exports.getAll = getAll;
exports.getById = getById;
exports.getByHebName = getByHebName;
exports.getByEngName = getByEngName;
exports.create = create;
exports.update = update;
exports.remove = remove;