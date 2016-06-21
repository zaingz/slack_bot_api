var constants = {
	slack_bot_credentials: {
		oauth_url: "https://slack.com/oauth/authorize",
		client_id: "35985964257.51231166311",
		secret: "cebff762df18b63e292d2f91ac22eca3",
		//scope: "identify,channels:write,channels:read,chat:write:bot,chat:write:user,users:read,team:read,users:write,bot"
		scope: "identify,bot"
	}
}

module.exports = constants;