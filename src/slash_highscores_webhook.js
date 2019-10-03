({ http_event }) => {
  // console.log(http_event)
  let body = http_event.parsed_body;
  // console.log(body)
  
  let rec = api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: `id="${body.team_id}"`});
  let blocks = [];
  console.log(rec);
  for (field in rec.fields) {
    
    console.log(field)
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