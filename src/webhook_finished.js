/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
  setImmediate(() => {
    // parse submission
    let qs = require("qs.js");
    let payload = JSON.parse(http_event.parsed_body.payload);
    let state = JSON.parse(payload.state);
    console.log(payload);

    // calculate timings
    const old = state.ts / 1000;
    const newer = payload.action_ts;
    const wpm = Math.floor(payload.submission.original.split(" ").length / ((newer - old) / 60));

    // advanced anti-hack detection
    if (wpm > 300) {
      let msg = {
        channel: payload.channel.id,
        user: payload.user.id,
        text: `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:`
      };
      api.run("slack.post_chat_ephemeral", { $body: msg }, { asGroup: payload.team.id });
      return;
    }

    // validate and determine result
    const userInput = payload.submission.input.trim();
    let result;
    if (payload.submission.input === payload.submission.original) {
      result = "Nice job!";

      // if user beats record, then set it and notify user
      let highscore = api.run("this.update_best_record", {
        workspaceId: payload.team.id,
        textId: state.paragraphId,
        username: payload.user.name,
        wpm: wpm
      });
      if (highscore.updated) {
        result = `:crown: Congratulations, you beat *${highscore.oldName}* and now hold the record for this text!`;
      }
    } else {
      result =
        "Sorry, input does not match!\n\n" +
        api.run("this.generate_diff", {
          input: payload.submission.input,
          original: payload.submission.original
        })[0];
    }

    /*
     * Notify user of result
     */

    let post = {
      channel: payload.channel.id,
      user: payload.user.id,
      text: `${result} \n*Wpm = ${wpm}*`,
    };

    console.log(post);
    return api.run("slack.post_chat_ephemeral", { $body: post }, { asGroup: payload.team.id });
  });

  // return to Slack right away to prevent timeout
  return {
    status_code: 200
  };
}
