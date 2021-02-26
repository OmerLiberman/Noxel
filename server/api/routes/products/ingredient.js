const express = require('express');
const {check} = require('express-validator');

const IngredientController = require('../../controllers/products/ingredient');

const router = express.Router();

router.get('/', IngredientController.getAll);

router.get('/id/:id', IngredientController.getById);

router.get('/heb-name/:heb', IngredientController.getByHebName);

router.get('/eng-name/:eng', IngredientController.getByEngName);

router.post('/', IngredientController.create);

router.patch('/:id', IngredientController.update);

router.delete('/:id', IngredientController.remove)

module.exports = router;