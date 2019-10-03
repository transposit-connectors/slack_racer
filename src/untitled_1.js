(params) => {
  let rec = api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: `id="${params.workspaceId}"`})[0];
  let blob = rec.fields[params.paragraphId]
  
  let meta = {username: "", wpm: -1};
  if (blob ~= null) {
  	meta = JSON.parse(rec.fields[params.paragraphId]);  
  }
  
  
  return meta
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */