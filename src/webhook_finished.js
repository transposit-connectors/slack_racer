({ http_event }) => {
  setImmediate(() => {
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
    let state = JSON.parse(payload.state);
    console.log(payload)

    const old = state.ts/1000
    const newer = payload.action_ts
	const wpm = payload.submission.original.split(' ').length / ((newer - old) / 60)

    const diffs = api.run('this.generate_diff', {input: payload.submission.input, original: payload.submission.original});
    var result = 'Fail';
    if (diffs.length === 0) {
      result = 'Success';
    }
    
    
    var toReturn = `${result}. Wpm = ${wpm}`;
    diffs.forEach((diff) => {
      toReturn += `\n${diff}`
    });
    
    
    
    
    
    
    
    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      text: `${result}. Wpm = ${wpm}` 
    }
    return api.run('slack_bot.post_chat_ephemeral', {$body: post});
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */