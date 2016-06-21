'use strict'
var TeamConfig = require('../models/team_config');
var time_helper = require('./time_helper');
var ChatWorker = require('../workers/chat_worker');
var CronJobManager = require('cron-job-manager');
var manager = new CronJobManager(); 
var SlackBot = require('slackbots');


module.exports = function(team_config){


	var cronTime = time_helper.get_cron_time(team_config);
	var bot = new SlackBot({
	    token: team_config.bot_app_token,
	    name: team_config.bot_name
	});

	console.log(bot)

	try{
		if (manager.exists("job_"+team_config._id)){
			console.log('Updating the existing job');
			manager.update(
	        "job_"+team_config._id,
	        cronTime,
	        function() { ChatWorker(bot, team_config); }
	      );
		}else{
			console.log('Adding a new job');
			inform(bot, team_config)
			 manager.add(
		        "job_"+team_config._id,
		        cronTime,
		        function() { ChatWorker(bot, team_config); },
		        {start: true }  
		      );
			

		}
		 console.log("I got the current jobs: " + manager)
	}catch(err){console.log(err)}
	
}



function inform(bot,team_config){
	informTeam(bot,team_config)
	informTheChannels(bot,team_config)
}

function informTeam(bot,team_config){



	bot.on('start', function() {

		for (let i=0; i< team_config.selected_team_members.length; i++){
			
			bot.postMessageToUser(team_config.selected_team_members[i], 'Hi, I am daily update bot. I will ask you questions').then(function(data){
		     	console.log(data);
		     });
		}

    });

}

function informTheChannels(bot, team_config){
	
	bot.on('start', function() {

		for (let i=0; i< team_config.selected_channels.length; i++){
			
			bot.postMessageToChannel(team_config.selected_channels[i], 'Daily update bot is now configured. You will daily recive the updates here').then(function(data){
		     	console.log(data);
		     });
		}

    });


}