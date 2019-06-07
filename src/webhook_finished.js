({ http_event }) => {
  api.run('airtable.create_recoerd', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', $body: {fields: {id: "12", text: http_event}}});
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