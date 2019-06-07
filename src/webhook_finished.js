({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event).body);
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    challenge: body.challenge,
    body: { "greeting": "Hello World" }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */