({ http_event }) => {
  let qs = require('qs.js');
  let body = JSON.parse(qs.parse(http_event).body);
  console.log(body);
  api.run('airtable.create_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', $body: {fields: {id: 12, text: body.challenge}}});
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: { "greeting": "Hello World" }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */