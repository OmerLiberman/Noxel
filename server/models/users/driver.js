const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Driver = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: false},
  password: {type: String, required: false},
  classrooms: [
    {
      classroom: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Classroom',
      },
      visited: {type: Boolean, default: false},
    },
  ],
}, {timestamps: true});

module.exports = mongoose.model('Driver', Driver);