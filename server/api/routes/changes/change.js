const express = require('express');
const {check} = require('express-validator');

const Change = require('../../controllers/changes/change');

const router = express.Router();

router.get('/', Change.getAll);

router.get('/id/:id', Change.getById);

router.post('/', Change.create);

router.patch('/:id', Change.update);

router.delete('/:id', Change.remove);

module.exports = router;