({slackBody}) => {
  console.log(slackBody);
  return api.run('slack_bot.open_dialog', 
  {
    "trigger_id": slackBody.trigger_id,
    "dialog": {
      "callback_id": "ryde-46e2b0",
      "title": "Request a Ride",
      "submit_label": "Request",
      "notify_on_cancel": true,
      "state": "Limo",
      "elements": [
          {
              "type": "text",
              "label": "Pickup Location",
              "name": "loc_origin"
          },
          {
              "type": "text",
              "label": "Dropoff Location",
              "name": "loc_destination"
          }
      ]
    }
  })
  let text = api.run('this.get_random_paragraph')[0];
  let post = {
    channel: slackBody.channel_id,
  	user: slackBody.user_id,
    text: text,
  }
  
  return api.run('slack_bot.post_chat_message', {$body: post});
}