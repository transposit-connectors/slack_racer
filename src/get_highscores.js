(params) => {
  var records = [];
  api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'texts'}).forEach((rec) => {
    var user = '' |
    records.push({
      id: rec.fields.id,
      text: rec.fields.text.substring(0, 65) + '...',
      wpm: rec.fields.wpm,
      user: (rec.fields.user) ? rec.fields.user : 'no highschore'
    })
  })
  return records;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */