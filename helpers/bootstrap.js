var QuestionSet = require('../models/question_set');
var TeamConfig = require('../models/team_config');

module.exports = function(){
	var Promise = require("bluebird");
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/daily_updates_bot');
	Promise.promisifyAll(mongoose); 


	QuestionSet.remove().execAsync();
	//TeamConfig.remove().execAsync();

	var question_set = new QuestionSet({
		set_label: 'Stand Up Questions',
		questions: ['How are you feeling today?', 'Who is barack Obama']
	});

	question_set.save(function(err, data){
		//console.log(data);
	});



}

