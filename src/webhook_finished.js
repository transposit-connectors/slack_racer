({ http_event }) => {
  let qs = require('qs.js');
  let payload = qs.parse(http_event.parsed_body).payload;
  console.log(JSON.parse(payload));
  return;
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