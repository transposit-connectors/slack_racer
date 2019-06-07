({ http_event }) => {
  setImmediate(() => {
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
    console.log(http_event.parsed_body);
    console.log(payload);
    var result = "fail";
    if (payload.submission.text === payload.submission.input) {
      result = "success"
    }
    
    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      text: result
    }
    return api.run('slack_bot.post_chat_ephemeral', {$body: post});
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */