(params) => {
  let rec = api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: `id="${params.workspaceId}"`})[0];
  let blob = rec.fields[params.paragraphId]
  
  let meta = {username: "", wpm: -1};
  if (blob != null) {
  	meta = JSON.parse(rec.fields[params.paragraphId]);  
  }
  
  let oldName = meta.username;
  if (meta.wpm < params.wpm) {
    meta.username = params.username;
    meta.wpm = params.wpm;
    
    let fields = {};
    fields[params.paragraphId] = JSON.stringify(meta);
    api.run('airtable.update_record', {baseId: env.get("baseId"), table: 'Workspaces', recordId: rec.id, $body: {fields}});
    return {updated: true, oldName};
  }
  return {updated: false};
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */