const express = require('express');
const {check} = require('express-validator');

const DriverController = require('../../controllers/users/driver');

const router = express.Router();

router.get('/', DriverController.getAll);

router.get('/id/:id', DriverController.getById);

router.get('/name/:name', DriverController.getByName);

router.post('/', DriverController.create);

router.patch('/:id', DriverController.update);

router.delete('/:id', DriverController.remove)

module.exports = router;