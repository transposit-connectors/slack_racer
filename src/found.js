({slackBody}) => {
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: slackBody.channel_id,
    user: slackBody.user_id,
    text: `You've run the slack command`,
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "@slackRacer" + text,
      },
    }]
  }
  
  return api.run('slack_bot.post_chat_ephemeral', {$body: post});
}