var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignmentNumber: {type:Number, required: true},
  studentName: {type:String, required: true},
  score: {type:Number, required: true},
  dateCompleted: {type:Date, required: true}
});

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
