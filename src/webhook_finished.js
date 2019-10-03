/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
  setImmediate(() => {
    // parse submission 
    let qs = require('qs.js');
    let payload = JSON.parse(http_event.parsed_body.payload);
    let state = JSON.parse(payload.state);
    console.log(payload)

    // calculate timings
    const old = state.ts/1000
    const newer = payload.action_ts
	const wpm = Math.floor(payload.submission.original.split(' ').length / ((newer - old) / 60))
    
    // advanced anti-hack detection
    if (wpm > 1000000000000) {
      let msg = {
        channel: payload.channel.id,
        user: payload.user.id,
        text: `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:` 
      }
      api.run('slack.post_chat_ephemeral', {$body: msg}, {asGroup: payload.team.id});
      return;
    }

    // validate and determine result
    const userInput = payload.submission.input.trim();
    let result;
    if (payload.submission.input === payload.submission.original) {
      result = 'Nice job!';
  	  // can store recordId -> fasted_wpm mapping in stash
      const currRecord = api.run('airtable.get_record', {baseId: env.get("baseId"), table: 'Texts', recordId: state.recordId})[0];
      if (wpm > currRecord.fields.wpm) {
        api.run('airtable.update_record', {baseId: env.get("baseId"), table: 'Texts', recordId: state.recordId, $body: {fields: {wpm: wpm, user: payload.user.name}}})
        result = `:crown: Congratulations, you beat *${currRecord.fields.user}* and now hold the record for this text!`
      }
    } else {
      result = 'Sorry, input does not match!\n\n' + api.run("this.generate_diff", {input: payload.submission.input, original: payload.submission.original})[0]
    }

    /*
     * Notify user of result
     */
    
    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      // text: `${result} \n*Wpm = ${wpm}*`,
      blocks: 
        [
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": `${result} \n*Wpm=${wpm}* \u0040`
              }
          }
        ]}
    
    console.log(post);
    return api.run('slack.post_chat_ephemeral', {$body: post}, {asGroup: payload.team.id});
  });
  
  // return to Slack right away to prevent timeout
  return {
    status_code: 200,
  };
}