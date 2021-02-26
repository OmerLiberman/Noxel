const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payer = new Schema({
  // English name.
  engName: {type: String, required: false},
  // Hebrew name.
  hebName: {type: String, required: true},
  // English address.
  engAddress: {type: String, required: false},
  // Hebrew address.
  hebAddress: {type: String, required: false},
  // Inner code.
  code: {type: String, required: true},
  // The user who added the classroom to the system.
  createdBy: {type: mongoose.Types.ObjectId, required: false, ref: 'User'},
  // Classrooms under the payer.
  classrooms: [{type: mongoose.Types.ObjectId, required: false, ref: 'Classroom'},],
  // Schools under the payer.
  schools: [{type: mongoose.Types.ObjectId, required: false, ref: 'School'},],
}, {timestamps: true});

module.exports = mongoose.model('Payer', Payer);