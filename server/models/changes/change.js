const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Change = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  changeId: {type: Number, unique: true, min: 2},
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
  handled: {type: Boolean, default: false},
  status: {type: String, default: 'nothandled'},
  changeType: {type: String, default: 'onetime'}, // can also be 'permanent'
  description: {type: String, default: ''},
  newMenu: {type: Schema.Types.ObjectId, ref: 'Menu'},
  oneTimeMenu: {type: Schema.Types.ObjectId, ref: 'Menu'}
}, {timestamps: true});

module.exports = mongoose.model('change', Change);