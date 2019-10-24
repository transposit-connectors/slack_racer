/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
    // parse submission
    console.log(http_event);
    let qs = require("qs.js");
    let payload = JSON.parse(http_event.parsed_body.payload);
    console.log(payload);
    let view = payload.view;
    let metadata = JSON.parse(payload.view.private_metadata);
    console.log(metadata);
    
    // pull out submission (dependent on order of blocks; for speed)
    let input = view.state.values.input.input.value;
    let original = view.blocks[0].text.text;

    // calculate timings
    const old = metadata.ts / 1000;
    const newer = payload.action_ts / 1000;
    const wpm = Math.floor(original.split(" ").length / ((newer - old) / 60));

    // validate and determine result
    const userInput = input.trim();
    let result;
    let blocks;
    
    // advanced anti-hack detection
    if (wpm > 30000000) {
      result = `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:`;
    } else if (input === original) {
      // if user beats record, then set it and notify user
      result = api.run("this.update_best_record", {
        workspaceId: payload.team.id,
        textId: state.textId,
        username: payload.user.name,
        wpm
      })[0].message;
    } else {
      result = `Sorry, input did not match. *${wpm} wpm*`;
      /* generate diff here */
    }

    // notify user of result
    let resultsView = api.run("this.generate_results_view", {testView: view, input, result})[0];

    return {
      status_code: 200,
      body: {
        response_action: "update",
        view: resultsView
      }
    }
}
