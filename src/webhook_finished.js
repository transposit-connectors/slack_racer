({ http_event }) => {
  setImmediate(() => {
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
	console.log(payload.action_ts)
    console.log(payload.state.ts)
    const diffs = api.run('this.generate_diff', {input: payload.submission.input, original: payload.submission.text});
    var result = 'Fail.';
    if (diffs.length === 0) {
      result = 'Success';
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