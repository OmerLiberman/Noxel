const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const authMiddleware = require('../../../middlewares/auth');
const User = require('../../../models/users/user');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
    '/',
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      try {
        let user = await User.findOne({ username: username });

        if (!user) {
          return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 * 5 }, // 5 hourse
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);

module.exports = router;