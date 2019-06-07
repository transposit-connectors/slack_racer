({slackBody}) => {
  let text = api.run('this.get_random_paragraph')[0];

  const elements = [{
    type: "textarea",
    name: "input",
    label: "input",
    min_length: text.length,
  }, {
    type: "textarea",
    name: "texd",
    label: "text",
    value: text,
    min_length: text.length
  }];
  
  const state = JSON.stringify({
    sender: user,
    ts,
    content: text.substring(0,2900)
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