const express = require('express');
const {check} = require('express-validator');

const Classroom = require('../../../models/clients/class-room');
const School = require('../../../models/clients/school');

const router = express.Router();

router.get('/classrooms', async (req, res) => {
  try {
    const classroomsNum = await Classroom.countDocuments();
    res.status(200).json({classrooms: classroomsNum});
  } catch (err) {
    res.status(200).json(err);
  }
});

router.get('/schools', async (req, res) => {
  try {
    const schoolsNum = await School.countDocuments();
    res.status(200).json({schools: schoolsNum});
  } catch (err) {
    res.status(200).json(err);
  }
});

router.get('/kids', async (req, res) => {
  try {
    const result = await Classroom.aggregate([
      {
        $group: {
          _id: null,
          kids: {$sum: '$kids'},
        },
      }]);
    res.status(200).json({kids: result[0].kids});
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = router;