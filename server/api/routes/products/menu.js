const express = require('express');
const {check} = require('express-validator');

const MenuController = require('../../controllers/products/menu');

const router = express.Router();

router.get('/', MenuController.getAll);

router.get('/id/:id', MenuController.getById);

router.get('/heb-name/:heb', MenuController.getByHebName);

router.get('/eng-name/:eng', MenuController.getByEngName);

router.post('/', MenuController.create);

router.patch('/:id', MenuController.update);

router.delete('/:id', MenuController.remove)

module.exports = router;