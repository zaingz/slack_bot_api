var express = require('express');
var router = express.Router();
var constants = require('../../constants');
var Promise = require("bluebird");
var TeamConfig = require('../../models/team_config')
var request = Promise.promisify(require("request"));




router.get('/login', function(req, res){

	var slack = constants.slack_bot_credentials;
	console.log(constants);
	var url = slack.oauth_url+"?client_id="+  slack.client_id +"&scope="+ slack.scope;
	res.redirect(url);

});

router.get('/redirect', function(req, _res){
	var code = req.query.code;
	console.log(code);
	//req.next();
	var slack = constants.slack_bot_credentials;
	var url = "https://slack.com/api/oauth.access";
	var params = {
		client_id: slack.client_id,
		code: code,
		client_secret: slack.secret
	};

	request(url, {qs:params}).then(function(res) {
		console.log("Slack Res: ", res.body.toString('utf8'));
		//save the response to the teamconfig model
		response = JSON.parse(res.body.toString('utf8'));
		TeamConfig.findOne({bot_user_id: response.bot.bot_user_id}, function(err, tf){
			if(err) console.error(err);
			if(!tf)
			tf = TeamConfig();
			tf.bot_app_token = response.bot.bot_access_token;
			tf.user_id = response.user_id;
			tf.team_id = response.team_id;
			tf.team_name = response.team_name;
			tf.bot_user_id = response.bot.bot_user_id;
			tf.res_dump = response;
			tf.save(function(err, tf){
				if(!err)
					_res.json({team_config_id: tf._id});
				else
					_res.json({error: err});
			});
		// Redirect the User Here To the Main App
		});



	});//end of promise


});


module.exports = router;