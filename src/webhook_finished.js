/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
  let qs = require("qs.js");
  let payload = JSON.parse(http_event.parsed_body.payload);
  console.log(payload);
  
  setImmediate(() => {
    switch (payload.view.callback_id) {
      case "test":
        return api.run("this.process_test_response", {payload});
      case "results":
        let view = payload.view;
        let metadata = JSON.parse(view.private_metadata);
        const viewJson = api.run("this.generate_test_view", {textId: metadata.textId})[0]; 
        return api.run("slack.views_update", { $body: { view_id: view.id, view: viewJson }}, { asGroup: payload.team.id });
      case "loading":
        return {status_code: 400};
      default:
        return {status_code: 400};
    }
  });

  // using response_action, must respond with everything within 3 seconds
  return api.run("this.ack_loading_screen", {title: payload.view.title})[0];
}