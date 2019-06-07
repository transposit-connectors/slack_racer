({slackBody}) => {
  const im = api.run('slack_bot.open_im', {$body: {
    "return_im": true,
    "include_locale": true,
    "user": slackBody.user_id,
  }})[0];
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: 'DGNG13MQB',//slackBody.channel_id,
  	user: slackBody.user_id,
    text: `You've run the slack command`,
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text,
      },
    }]
  }
  
  return api.run('slack_bot.post_chat_ephemeral', {$body: post});
}