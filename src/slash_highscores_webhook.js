({ http_event }) => {
  console.log(http_event)
  let body = http_event.parsed_body;
  console.log(body)
  
  let records = api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: `id="${body.team_id}"`});
  let blocks = [];
  
  for (rec in records) {
    let blob = rec.fields[]
    blocks.push(
        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `Do you know what they ca... \t\t *${rec.fields.}* | *wpm: 58*`
			}
		},
		{
			"type": "divider"
		}
    )
  }
  return records
  
  
  
  
  
  
  
  
  
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