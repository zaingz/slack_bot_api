var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var questionSetSchema = Schema({

  set_label: String,
  questions: [String]
  
}, {timestamps: true});

QuestionSet = mongoose.model('QuestionSet', questionSetSchema);

module.exports = QuestionSet;



