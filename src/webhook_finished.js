/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
    // parse submission
  let qs = require("qs.js");
  let payload = JSON.parse(http_event.parsed_body.payload);
  console.log(payload);
  
  setImmediate(() => {
    switch (payload.view.callback_id) {
      case "test":
        return api.run("this.process_test_response", {payload});
      case "results":
        // retry
        const viewJson = api.run("this.generate_test_view", {stringify: true, textId: (textId || -1)})[0]; 
        return api.run("slack.views_open", { $body: { trigger_id: body.trigger_id, view: viewJson }}, { asGroup: body.team_id });
      case "loading":
        return {status_code: 400};
      default:
        return {status_code: 400};
    }
    
  });

  // using response_action, must respond with everything within 3 seconds
  return api.run("this.ack_loading_screen", {title: payload.view.title})[0];
}