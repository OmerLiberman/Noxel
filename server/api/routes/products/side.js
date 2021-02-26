const express = require('express');
const {check} = require('express-validator');

const SideController = require('../../controllers/products/side');

const router = express.Router();

router.get('/', SideController.getAll);

router.get('/id/:id', SideController.getById);

router.get('/heb-name/:heb', SideController.getByHebName);

router.get('/eng-name/:eng', SideController.getByEngName);

router.post('/', SideController.create);

router.patch('/:id', SideController.update);

router.delete('/:id', SideController.remove)

module.exports = router;