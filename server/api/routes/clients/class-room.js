const express = require('express');
const {check} = require('express-validator');

const ClassRoomController = require('../../controllers/clients/class-room');

const router = express.Router();

router.get('/', ClassRoomController.getAll);

router.get('/names', ClassRoomController.getAllNames);

router.get('/id/:id', ClassRoomController.getById);

router.get('/heb-name/:heb', ClassRoomController.getByHebName);

router.get('/eng-name/:eng', ClassRoomController.getByEngName);

router.post('/', ClassRoomController.create);

router.patch('/:id', ClassRoomController.update);

router.delete('/:id', ClassRoomController.remove)

module.exports = router;