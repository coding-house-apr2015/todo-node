'use strict';

var Mongoose = require('mongoose');

var taskSchema = Mongoose.Schema({
  title: {type: String, required: true},
  due: {type: Date, required: true},
  userId : {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  isComplete: {type: Boolean, required: true, default: false},
  createdAt : {type: Date, required: true, default: Date.now}
});

var Task = Mongoose.model('Task', taskSchema);
module.exports = Task;
