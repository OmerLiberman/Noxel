const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, require: true},
  classrooms: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Classroom',
    }],
  schools: [{type: mongoose.Types.ObjectId, required: false, ref: 'School'}],
  payer: {type: mongoose.Types.ObjectId, required: false, ref: 'Payer'},
  isAdmin: {type: Boolean, required: false, default: false},
  isPayer: {type: Boolean, required: false, default: false},
  isSchoolManager: {type: Boolean, required: false, default: false},
  isClassroomManage: {type: Boolean, required: false, default: false},
}, {timestamps: true});

module.exports = mongoose.model('User', User);