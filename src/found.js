({slackBody}) => {
  return api.run('slack_bot.open_im', {
    "return_im" : true,
    "include_locale" : true,
    "user" : slackBody.user_id,
  });
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: slackBody.user_id,
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