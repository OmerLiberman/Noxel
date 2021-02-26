const express = require('express');
const {check} = require('express-validator');

const MealController = require('../../controllers/products/meal');

const router = express.Router();

router.get('/', MealController.getAll);

router.get('/id/:id', MealController.getById);

router.get('/heb-name/:heb', MealController.getByHebName);

router.get('/eng-name/:eng', MealController.getByEngName);

router.post('/', MealController.create);

router.patch('/:id', MealController.update);

router.delete('/:id', MealController.remove)

module.exports = router;