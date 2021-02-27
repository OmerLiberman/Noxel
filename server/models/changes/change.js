const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Change = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  changeId: {type: Number, unique: true, min: 2},
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
  handled: {type: Boolean, default: false},
  status: {type: String, default: 'nothandled'},
  changeType: {type: String, default: 'onetime'}, // can also be 'permanent'
  description: { type: String }
}, {timestamps: true});

Change.plugin(AutoIncrement, { inc_field: 'changeId' });
module.exports = mongoose.model('change', Change);