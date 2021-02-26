const express = require('express');
const {check} = require('express-validator');

const SchoolController = require('../../controllers/clients/school');

const router = express.Router();

router.get('/', SchoolController.getAll);

router.get('/id/:id', SchoolController.getById);

router.get('/heb-name/:heb', SchoolController.getByHebName);

router.get('/eng-name/:eng', SchoolController.getByEngName);

router.post('/', SchoolController.create);

router.patch('/:id', SchoolController.update);

router.delete('/:id', SchoolController.remove)

module.exports = router;