({slackBody}) => {
  let text = api.run('this.get_random_paragraph')[0];

  const elements = [{
    type: "text",
    name: "message",
    label: "Write this",
  }];
  
  const state = JSON.stringify({
    sender: user,
    ts,
    content: text.substring(0,2900)
  })
  
  const dialogObj = {
    callback_id: "send_report",
    notify_on_cancel: false,
    title: "Report Message",
    elements,
    state
  };

  const trigger_id = slackBody.trigger_id;
    console.log(slackBody);

  return api.run("slack_bot.open_dialog", { $body: { trigger_id, dialog: JSON.stringify(dialogObj)}});
}