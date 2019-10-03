({ http_event }) => {
  // console.log(http_event)
  var _ = require('underscore.js');
  let body = http_event.parsed_body;
  // console.log(body)
  
  let rec = api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: `id="${body.team_id}"`})[0];
  let blocks = [];
  console.log(rec)
  console.log(rec.fields);
  for (field in rec.fields) {
    if (parseInt(field)) {
      blocks.push(
        {
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "This is a plain text section block.",
				"emoji": true
			}
		})
      blocks.push(
		{
			"type": "divider"
		})
    }
  }
  
  
  
  
  
  
  
  
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