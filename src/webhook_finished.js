({ http_event }) => {
  setImmediate(() => {
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
    let state = JSON.parse(payload.state);
    console.log(payload)

    const old = state.ts/1000
    const newer = payload.action_ts
	const wpm = Math.floor(payload.submission.original.split(' ').length / ((newer - old) / 60))
    
    const userInput = payload.submission.input.trim();
    var result = 'Sorry, input does not match!';
    if (payload.submission.input === payload.submission.original) {
      result = 'Nice job!';
      const rec = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: state.recordId})[0];
      console.log(rec)
      if (rec.fields.wpm < wpm) {
        api.run('airtable.update_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: state.recordId, $body: {fields: {wpm: wpm, user: payload.user.name}}})
        result = `\n :crown: Congratulations, you beat ${rec.fields.user} and now hold the record for this text!`
      }
    }
    
    if (wpm > 220) {
      let msg = {
        channel: payload.channel.id,
        user: payload.user.id,
        text: `${wpm} wpm? Something smells fishy :fish: :face_with_monocle:` 
      }
      return api.run('slack.post_chat_ephemeral', {$body: msg});
    }

    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      text: `${result} Wpm = ${wpm}` 
    }
    return api.run('slack.post_chat_ephemeral', {$body: post});
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */