const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new Schema({
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
  // The payer.
  payer: {type: mongoose.Types.ObjectId, required: false, ref: 'Payer'},
  // The user who added the classroom to the system.
  createdBy: {type: mongoose.Types.ObjectId, required: false, ref: 'User'},
  // The user who edited the classroom last time
  updatedBy: {type: mongoose.Types.ObjectId, required: false, ref: 'User'},
  // Classrooms in school.
  classrooms: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'ClassRoom',
    }],
}, {timestamps: true});

module.exports = mongoose.model('School', School);