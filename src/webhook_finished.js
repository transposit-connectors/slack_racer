({ http_event }) => {
  
  setImmediate(() => {
    /*
     * Parse submission 
     */
    
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
    let state = JSON.parse(payload.state);
    console.log(payload)

    // calculate timings
    const old = state.ts/1000
    const newer = payload.action_ts
	const wpm = Math.floor(payload.submission.original.split(' ').length / ((newer - old) / 60))
    
    // advanced anti-hack detection
    if (wpm > 220) {
      let msg = {
        channel: payload.channel.id,
        user: payload.user.id,
        text: `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:` 
      }
      api.run('slack.post_chat_ephemeral', {$body: msg}, {asGroup: payload.team.id});
      return;
    }

    /*
     * Validate and determine result
     */
    
    const userInput = payload.submission.input.trim();
    let result = 'Sorry, input does not match!';
    // TODO: generate diff of response
    
    if (payload.submission.input === payload.submission.original) {
      result = 'Nice job!';
  	  // can store recordId -> fasted_wpm mapping in stash
      const currRecord = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: state.recordId})[0];
      if (wpm > currRecord.fields.wpm) {
        api.run('airtable.update_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: state.recordId, $body: {fields: {wpm: wpm, user: payload.user.name}}})
        result = `:crown: Congratulations, you beat *${currRecord.fields.user}* and now hold the record for this text!`
      }
    }

    /*
     * Notify user of result
     */
    
    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      text: `${result} *Wpm = ${wpm}*` 
    }
    api.run('slack.post_chat_ephemeral', {$body: post}, {asGroup: payload.team.id});
    return;
  });
  
  // return to Slack right away to prevent timeout
  return {
    status_code: 200,
  };
}