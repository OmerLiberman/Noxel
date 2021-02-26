const express = require('express');
const {check} = require('express-validator');

const UserController = require('../../controllers/users/user');

const router = express.Router();

router.get('/', UserController.getAll);

router.post('/', UserController.create);

router.patch('/:id', UserController.update);

router.delete('/:id', UserController.remove)

module.exports = router;