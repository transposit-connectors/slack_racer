({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event).body);
  console.log(body.challenge);
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: { "challenge": body.challenge, "greeting": "Hello World" }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */