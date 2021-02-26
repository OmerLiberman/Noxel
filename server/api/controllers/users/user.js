const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

const User = require('../../../models/users/user');

const getAll = async (request, response) => {
  let users = null;
  try {
    users = await User.find();
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!users) {
    return response.status(404).json({message: 'No users are available.'});
  }
  return response.status(200).json({users: users});
};

// Register user.
const create = async (request, response) => {
  const values = request.body;

  try {
    // Check if user exists.
    let user = await User.findOne({username: values.username});
    if (user) {
      return response.status(400).json({error: 'User already exists.'});
    }

    // New user to be created.
    user = new User({...values});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(values.password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 * 2 }, // in seconds
        (err, token) => {
          if (err) throw err;
          response.json({ token });
        }
    )

  } catch (err) {
    return console.log(err);
  }
  return response.status(201).
      json({user: user.toObject({getters: true})});
};

// Update user.
const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let user = null;
  try {
    user = await User.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!user) {
    return response.status(404).json({message: 'Classroom was not found.'});
  }

  for (const [key, value] of Object.entries(values)) {
    user[key] = value;
  }

  try {
    await user.save();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({user: user.toObject({getters: true})});
};

// Remove user.
const remove = async (request, response) => {
  const id = request.params.id;

  let user = null;
  try {
    user = await User.findById(id);
  } catch (err) {
    return response.status(500).json({message: 'An error has been occurred.'});
  }
  if (!user) {
    return response.status(404).json({message: 'Object was not found.'});
  }

  try {
    await user.delete();
  } catch (err) {
    return console.log('Error was occurred.');
  }

  response.status(200).json({message: 'Object was deleted successfully.'});
};

exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.remove = remove;
