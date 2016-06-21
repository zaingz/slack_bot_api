var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var teamConfigSchema = Schema({
  bot_app_token: String,
  bot_user_id: String,
  bot_name: String,
  user_id: String,
  team_id: { type: String, index: { unique: true }},
  team_name: String,
  selected_team_members: [String],
  selected_channels: [String],
  question_set: {type: ObjectId, ref: 'QuestionSet'},
  company_time_zone: String ,
  week_days: [String],
  time_to_ask: String, //the time when bot will ask the question
  time_allowed_to_answer: Number, //window allowed to answer
  run_count: {type: Number, default: 0}, //tells how many time job has runned

  res_dump: Object
  
}, {timestamps: true});

TeamConfig = mongoose.model('TeamConfig', teamConfigSchema);

module.exports = TeamConfig;
