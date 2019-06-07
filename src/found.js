({slackBody}) => {
  let text = api.run('this.get_random_paragraph')[0];

  const elements = [{
    type: "textarea",
    name: "input",
    label: "input",
    value: text,
    min_length: text.length
  }, {
    type: "textarea",
    name: "text",
    label: "text"
  }];
  
  const dialogObj = {
    callback_id: "send_report",
    notify_on_cancel: false,
    title: "Copy the text",
    elements
  };

  const trigger_id = slackBody.trigger_id;
  return api.run("slack_bot.open_dialog", { $body: { trigger_id, dialog: JSON.stringify(dialogObj) }});
}