const Classroom = require('../../../models/clients/class-room');
const School = require('../../../models/clients/school');
const Payer = require('../../../models/clients/payer');

const getAll = async (request, response) => {
  let classrooms = null;
  try {
    classrooms = await Classroom.find()
    .populate({path: 'usualWeeklyMenu', populate:
          [
            {path: 'Sun', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Mon', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Tue', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Wed', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Thu', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
          ],
    })
    .populate({path: 'usualWeeklySides', populate:
          [
            {path: 'Sun', select: ['hebName', 'category']},
            {path: 'Mon', select: ['hebName', 'category']},
            {path: 'Tue', select: ['hebName', 'category']},
            {path: 'Wed', select: ['hebName', 'category']},
            {path: 'Thu', select: ['hebName', 'category']},
          ],
    })

  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classrooms) {
    return response.status(404).json({message: 'No classrooms are available.'});
  }
  return response.status(200).json({classrooms: classrooms});
};

const getAllNames = async (request, response) => {
  let classrooms = null;
  try {
    classrooms = await Classroom.find({}).select(['hebName', 'hasDriver']);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classrooms) {
    return response.status(404).json({message: 'No classrooms are available.'});
  }
  return response.status(200).json(classrooms);
};

const getById = async (request, response) => {
  const id = request.params.id;
  let classroom = null;
  try {

    classroom = await Classroom.findById(id)
    .populate({path: 'usualWeeklyMenu', populate:
          [
            {path: 'Sun', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Mon', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Tue', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Wed', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Thu', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
          ],
    })
    .populate({path: 'usualWeeklySides', populate:
          [
            {path: 'Sun', select: ['hebName', 'category']},
            {path: 'Mon', select: ['hebName', 'category']},
            {path: 'Tue', select: ['hebName', 'category']},
            {path: 'Wed', select: ['hebName', 'category']},
            {path: 'Thu', select: ['hebName', 'category']},
          ],
    })

  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classroom) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }
  return response.status(200).
      json({classroom: classroom.toObject({getters: true})});
};

const getByHebName = async (request, response) => {
  const heb = request.params.heb;
  let classroom = null;
  try {
    classroom = await Classroom.findOne({hebName: heb}).
        populate('school').
        populate('payer')
        .populate({path: 'usualWeeklyMenu', populate:
              [
                {path: 'Sun', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
                {path: 'Mon', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
                {path: 'Tue', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
                {path: 'Wed', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
                {path: 'Thu', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
              ],
        })
        .populate({path: 'usualWeeklySides', populate:
              [
                {path: 'Sun', select: ['hebName', 'category']},
                {path: 'Mon', select: ['hebName', 'category']},
                {path: 'Tue', select: ['hebName', 'category']},
                {path: 'Wed', select: ['hebName', 'category']},
                {path: 'Thu', select: ['hebName', 'category']},
              ],
        })

  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classroom) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }
  return response.status(200).
      json({classroom: classroom.toObject({getters: true})});
};

const getByEngName = async (request, response) => {
  const eng = request.params.eng;
  let classroom = null;
  try {
    classroom = await Classroom.findOne({engName: eng})
    .populate({path: 'usualWeeklyMenu', populate:
          [
            {path: 'Sun', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Mon', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Tue', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Wed', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
            {path: 'Thu', populate: {path: 'meals', select: ['hebName', 'kosherCategory']}},
          ],
    })
    .populate({path: 'usualWeeklySides', populate:
          [
            {path: 'Sun', select: ['hebName', 'category']},
            {path: 'Mon', select: ['hebName', 'category']},
            {path: 'Tue', select: ['hebName', 'category']},
            {path: 'Wed', select: ['hebName', 'category']},
            {path: 'Thu', select: ['hebName', 'category']},
          ],
    })

  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classroom) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }
  return response.status(200).
      json({classroom: classroom.toObject({getters: true})});
};

const create = async (request, response) => {
  try {
    const values = request.body;
    const classroom = new Classroom({...values});

    // Update payer if such.
    if (values.payer) {
      let payer = await Payer.findById(values.payer);
      payer.classrooms.push(classroom);
      payer.save();
    }

    // Update school if such
    if (values.school) {
      if (!values.payer) {
        let school = await School.findById(values.school);
        if (school.payer) {
          classroom.payer = school.payer;
          let payer = await Payer.findById(school.payer);
          payer.classrooms.push(classroom);
          payer.save();
        }
        school.classrooms.push(classroom);
        school.save();
      }
      // Payer has been updated already.
      else {
        let school = await School.findById(values.school);
        school.classrooms.push(classroom);
        school.save();
      }
    }

    try {
      await classroom.save();
    } catch (err) {
      return console.log(err);
    }
    response.status(201).
        json({classroom: classroom.toObject({getters: true})});
  } catch (err) {
    return response.status(500).
        json({err: err.message});
  }

};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let classroom = null;
  try {
    classroom = await Classroom.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classroom) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    classroom[key] = value;
  }

  try {
    await classroom.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({classroom: classroom.toObject({getters: true})});
};

const remove = async (request, response) => {
  const id = request.params.id;

  let classroom = null;
  try {
    classroom = await Classroom.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!classroom) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await classroom.delete();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({message: 'Object was deleted successfully.'});
};

exports.getAll = getAll;
exports.getAllNames = getAllNames;
exports.getById = getById;
exports.getByHebName = getByHebName;
exports.getByEngName = getByEngName;
exports.create = create;
exports.update = update;
exports.remove = remove;
