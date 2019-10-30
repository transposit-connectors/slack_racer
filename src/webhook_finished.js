/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
    // parse submission
  let qs = require("qs.js");
  let payload = JSON.parse(http_event.parsed_body.payload);
  console.log(payload);
  let view = payload.view;
  let type = view.callback_id;
  let metadata = JSON.parse(view.private_metadata);
  
  setImmediate(() => {
    // pull out submission (dependent on order of blocks; for speed)
    let input = view.state.values.input.input.value;
    let original = view.blocks[0].text.text;

    // calculate timings
    const old = metadata.ts / 1000;
    const newer = Date.now() / 1000;
    const wpm = Math.floor(original.split(" ").length / ((newer - old) / 60));

    // validate and determine result
    const userInput = input.trim();
    let result;

    // advanced anti-hack detection
    if (wpm > 250) {
      result = `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:`;
    } else if (input === original) {
      // recordkeeping
      result = api.run("this.update_best_record", {
        workspaceId: payload.team.id,
        textId: metadata.textId,
        username: payload.user.name,
        wpm
      })[0].message;
    } else {
      result = `Sorry, input did not match! *${wpm} wpm*`;
      /* generate diff here */
    }
    
    let resultView = api.run("this.generate_results_view", {
        testView: view,
        input,
        result
      })[0]
    api.run("slack.views_update", {$body: {view_id: view.id, view: resultView}}, {asGroup: payload.team.id})
  });

  // using response_action, must respond with everything within 3 seconds
  console.log(api.run("this.ack_loading_screen", {title: view.title})[0])
  return api.run("this.ack_loading_screen", {title: view.title})[0];
  // return {
  //   status_code: 200,
  //   body: {
  //     response_action: "update",
  //     view: api.run("this.generate_results_view", {
  //       testView: view,
  //       input,
  //       result
  //     })[0]
  //   }
  // };
}