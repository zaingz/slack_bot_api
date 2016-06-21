'use strict'
var SlackBot = require('slackbots');
var QuestionSet = require('../models/question_set');

module.exports = function(bot, team_config){

	console.log('cron job is started');
	//var q = {}
	QuestionSet.findById(team_config.question_set).execAsync().then(function(q){
		//q = data
		
		console.log('lest start the users shit');


		var team_members =  team_config.selected_team_members;
		var questions = q.questions;



		var userIDs = [];
		for (let i=0; i < team_members.length; i++){
			bot.postMessageToUser(team_members[i], questions[0])

			bot.getUser(team_members[i]).then(function(data){
				userIDs.push(data.id)
				console.log('*********************')
				console.log(data)
			})

		}
   		


		bot.on('message', function(data) {
			
	     	if (data.subtype !== 'bot_message' && data.type === 'message' ){


	     		/*console.log('******');
	     		console.log(data)*/
				bot.postMessageToUser(team_members[userIDs.indexOf(data.user)],  questions[1] )
				//num=num+1;  
	     	}
			
    	
		}); 
	
	
		
	});
	

/*
	bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
	    var params = {
	        icon_emoji: ':cat:'
	    };
		 bot.postMessageToUser('zaingz', 'Hi, I am aloo popito, Lets start my asking few questions :)', params).then(function(data){
	     	console.log(data);
	     }); 

     });
	
	var q = {}
	QuestionSet.findById(team_config.question_set).execAsync().then(function(data){
		q = data
		
	});
	
    let num = 0;
	bot.on('message', function(data) {
		
     	if (data.subtype !== 'bot_message' && data.type === 'message' ){

			bot.postMessageToUser('zaingz',  q.questions[num] )
			num=num+1;  
     	}
			
    	
	}); 
*/
	
}

function chatWithUser(bot, team_members, questions){


	console.log('inside the shit');



 //    });
}