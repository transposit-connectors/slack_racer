(params) => {
  const list = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Meta', recordId: 'recytAa5YjZi1OSJ9'})[0];
  const idx = Math.floor(Math.random()*list.fields.count);
  const entry = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: list.fields.texts[idx]})[0];
  return entry;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */