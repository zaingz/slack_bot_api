'use strict'
var express = require('express');
var router = express.Router();
var SlackBot = require('slackbots');
var TeamConfig = require('../../models/team_config');
var QuestionSet = require('../../models/question_set')
var CronJobHelper = require('../../helpers/cron_job_helper')


//TODO: change the file name _


router.route('/steps')
	.get(function(req, res){

	
		TeamConfig.findById(req.query.team_config_id).execAsync().then(function(team_config){
			
			let bot = new SlackBot({
	        	token: team_config.bot_app_token,
	        	name: team_config.bot_name
    		});
    		
			

			bot.on('start', function(data){
				
				bot.getUsers().always(function(users){
					bot.getChannels().then(function(channels){
					QuestionSet.find({}).execAsync().then(function(question_set){
						res.json({users: users, channels: channels, question_set: question_set})
					});
					//res.json({users: users, channels: channels})
					});
				})
			})

			bot.getUsers().always(function(users){
				console.log('the users are '+ data);
				res.json(data);
				/*bot.getChannels().then(function(channels){
					QuestionSet.find({}).execAsync().then(function(question_set){
						res.json({users: users, channels: channels, question_set: question_set})
					});
					//res.json({users: users, channels: channels})
				});*/
			});

		});

	













  })
	.patch(function(req, res){

		TeamConfig.findOneAndUpdate({_id: req.body.team_config_id}, {$set: {selected_team_members: req.body.selected_team_members, 
			selected_channels: req.body.selected_channels, question_set: req.body.question_set, 
			company_time_zone: req.body.company_time_zone, week_days: req.body.week_days, time_to_ask: req.body.time_to_ask, 
			time_allowed_to_answer: req.body.time_allowed_to_answer}}, {new: true}, function(err, team_config){
				



				//start the cron job
				if (!err){
					CronJobHelper(team_config);
					res.send('saved');
				}else
					res.send(err);


		});


	});
/*
router.get('/send-mesage', function(req, res){


	TeamConfig.findById(req.query.team_config_id).execAsync().then(function(team_config){
			
			bot = new SlackBot({
		        token: team_config.bot_app_token,
		        name: team_config.bot_name
	    	});

			
			bot.on('start', function() {
			// more information about additional params https://api.slack.com/methods/chat.postMessage
				var params = {
			    	icon_emoji: ':cat:'
				};

			// define channel, where bot exist. You can adjust it there https://my.slack.com/services 
				//bot.postMessageToChannel('general', 'meow!', params);
			//bot.postMessageToUser('zaingz', 'meow!', params); 
			bot.postMessageToUser('zaingz', 'hi', params, function(data) {});
			});

			bot.on('message', function(data) {
			    // all ingoing events https://api.slack.com/rtm 
			    console.log(data.text);
			});

	
});
});

*/

module.exports = router;