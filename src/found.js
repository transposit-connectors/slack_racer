({slackBody}) => {
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: slackBody.user_id,
  	user: slackBody.user_id,
    as_user: 'true',
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