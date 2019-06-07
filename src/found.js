({slackBody}) => {
  console.log(slackBody);
    return api.run('slack_bot.open_dialog', {dialog: "asd", trigger_id: "ASD"});
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: slackBody.channel_id,
  	user: slackBody.user_id,
    text: text,
  }
  
  return api.run('slack_bot.post_chat_message', {$body: post});
}