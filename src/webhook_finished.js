/*
 * Called by Slack when dialog box is submitted
 */

({ http_event }) => {
    // parse submission
  let qs = require("qs.js");
  let payload = JSON.parse(http_event.parsed_body.payload);
  console.log(payload);
  
  setImmediate(() => {
    switch (type) {
      case "test":
        api.run("this.process_test_response", {payload});
        break;
      case "results":
        break;
      case "loading":
        break;
      default:
        return {status_code: 400};
    }
    
  });

  // using response_action, must respond with everything within 3 seconds
  return api.run("this.ack_loading_screen", {title: payload.view.title})[0];
}