({ http_event }) => {
  let qs = require('qs.js');
  let payload = JSON.parse(http_event.parsed_body.payload);
  console.log(http_event.parsed_body);
  console.log(payload);
  var result = "fail";
  if (payload.submission.text === payload.submission.input) {
    result = "success"
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      text: result
    }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */