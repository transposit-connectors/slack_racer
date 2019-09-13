({slackBody}) => {
  
  /*
   * Fetch paragraph text from Airtable
   */
  const list = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Meta', recordId: 'recytAa5YjZi1OSJ9'})[0];
  const idx = Math.floor(Math.random()*list.fields.count);
  let rec = api.run('airtable.get_record', {baseId: 'appcX3FvaawpLi3eF', table: 'Texts', recordId: list.fields.texts[idx]})[0];
  let text = rec.fields.text;
  
  const elements = [{
    type: "textarea",
    name: "input",
    label: "Your input",
    hint: "Write the text from below into this text box"
    //min_length: text.length,
  }, {
    type: "textarea",
    name: "original",
    label: "Copy this",
    value: text,
    min_length: text.length
  }];
  
  // const ts = Date.now();
  const state = JSON.stringify({
    ts: Date.now(),
    recordId: rec.id
  })
  
  const dialog = {
    callback_id: "type_race",
    notify_on_cancel: false,
    title: "SlackRacer Speed Test",
    elements,
    state
  };

  const dialogJson =  JSON.stringify(dialog);
  api.run("slack.open_dialog", { $body: { trigger_id: body.trigger_id, dialog: dialogJson }}, { "asGroup": body.team_id }))
}