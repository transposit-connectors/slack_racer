(params) => {
  var records = [];
  api.run('airtable.get_records', {baseId: 'appcX3FvaawpLi3eF', table: 'texts'}).forEach((rec) => {
    var user = '' |
    records.push({
      id: rec.fields.id,
      text: rec.fields.text,
      user: (rec.fields.user) ? rec.fields.user : ''
    })
  })
  return records;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */