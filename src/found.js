({slackBody}) => {
  let { text, id }= api.run('this.get_random_paragraph')[0].fields;
  const elements = [{
    type: "textarea",
    name: "input",
    label: "input",
    //min_length: text.length,
  }, {
    type: "textarea",
    name: "original",
    label: "text",
    value: text,
    min_length: text.length
  }];
  
  // const ts = Date.now();
  const state = JSON.stringify({
    ts: Date.now(),
    recordId: text.id
  })
  
  const dialogObj = {
    callback_id: "send_report",
    notify_on_cancel: false,
    title: "Copy the text",
    elements,
    state
  };

  const trigger_id = slackBody.trigger_id;
  return api.run("slack_bot.open_dialog", { $body: { trigger_id, dialog: JSON.stringify(dialogObj) }});
}