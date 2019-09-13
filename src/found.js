({slackBody}) => {
  let rec = api.run('this.get_random_paragraph')[0];
  const text = rec.fields.text;
  
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

  return JSON.stringify(dialog);
  const trigger_id = slackBody.trigger_id;
  return api.run("slack_bot.open_dialog", { $body: { trigger_id, dialog: JSON.stringify(dialogObj) }});
}