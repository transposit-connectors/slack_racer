/*
 * Generate the dialog object to send to Slack
 */

({slackBody}) => {  
  /*
   * Fetch paragraph text from Airtable
   */
  const list = api.run('airtable.get_record', {baseId: env.get("baseId"), table: 'Meta', recordId: env.get("recordId")})[0];
  const idx = Math.floor(Math.random()*list.fields.count);
  let rec = api.run('airtable.get_record', {baseId: env.get("baseId"), table: 'Texts', recordId: list.fields.texts[idx]})[0];
  let text = rec.fields.text;
  
  const elements = [{
    type: "textarea",
    name: "input",
    label: "Your input",
    hint: "Write the below text into this box",
    min_length: text.length,
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

  return JSON.stringify(dialog);
}