({slackBody}) => {
  let post = {
    channel: slackBody.channel_id,
    user: slackBody.user_id,
    text: `You've run the slack command`,
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${api.user().email} has run the slack command`
      },
    }]
  }
  
  return api.run('slack_bot.post_chat_ephemeral', {$body: post});
}