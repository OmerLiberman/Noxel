const express = require('express');
const {check} = require('express-validator');

const PayerController = require('../../controllers/clients/payer');

const router = express.Router();

router.get('/', PayerController.getAll);

router.get('/id/:id', PayerController.getById);

router.get('/heb-name/:heb', PayerController.getByHebName);

router.get('/eng-name/:eng', PayerController.getByEngName);

router.post('/', PayerController.create);

router.patch('/:id', PayerController.update);

router.delete('/:id', PayerController.remove)

module.exports = router;