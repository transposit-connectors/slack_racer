({ http_event }) => {
  let qs = require('qs.js');
  let payload = JSON.parse(http_event.parsed_body.payload);
  
  var result = "fail";
  if (payload.submission.text === payload.submission.input) {
    result = "success"
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    test: result
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */