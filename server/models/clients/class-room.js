const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classroom = new Schema({
  // English name.
  engName: {type: String, required: false},
  // Hebrew name.
  hebName: {type: String, required: true},
  // English address.
  engAddress: {type: String, required: false},
  // Hebrew address.
  hebAddress: {type: String, required: false},
  // Hebrew name.
  hasDriver: {type: Boolean, required: false, default: false},
  // Num of kids in classroom.
  kids: {type: Number, required: true},
  // Inner code.
  code: {type: String, required: true},
  // The type of classroom, one of: ['school-classroom', 'kindergarten-classroom']
  classType: {type: String, required: true},
  // The school the classroom is in, not relevant for kindergarten.
  school: {type: mongoose.Types.ObjectId, required: false, ref: 'School'},
  // The payer.
  payer: {type: mongoose.Types.ObjectId, required: false, ref: 'Payer'},
  // The user who added the classroom to the system.
  createdBy: {type: mongoose.Types.ObjectId, required: false, ref: 'User'},
  // The user who edited the classroom last time
  lastUpdatedBy: {type: mongoose.Types.ObjectId, required: false, ref: 'User'},
  // The usual class menu.
  usualWeeklyMenu: {
    Sun: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
    Mon: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
    Tue: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
    Wed: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
    Thu: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
  },
  // The usual class daily sides.
  usualWeeklySides: {
    Sun: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
    Mon: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
    Tue: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
    Wed: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
    Thu: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
  },
  // The actual meals the class gets (can be changed on daily basis).
  menusHistory: [{
    date: {type: Date, default: Date.now},
    menu: {type: mongoose.Types.ObjectId, required: false, ref: 'Menu'},
  }],
  // The actual sides the class gets (can be changed on daily basis).
  sidesHistory: [{
    date: {type: Date, default: Date.now},
    sides: [{type: mongoose.Types.ObjectId, required: false, ref: 'Side'}],
  }],
  // changes history
  changes: [{
      date: {type: Date, default: Date.now},
      menu: {type: mongoose.Types.ObjectId, required: false, ref: 'Change'}
    }]
}, {timestamps: true});

module.exports = mongoose.model('Classroom', Classroom);