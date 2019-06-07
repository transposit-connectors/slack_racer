({slackBody}) => {
  console.log(slackBody);
  let text = api.run('this.get_random_paragraph')[0];

  const elements = [{
    type: "text",
    name: "message",
    label: "Write this",
  }];
  
  const dialogObj = {
    callback_id: "send_report",
    notify_on_cancel: false,
    title: "Report Message",
    elements,
    state
  }
  
  return api.run("slack.open_dialog", { $body: { slackBody.trigger_id, dialog: JSON.stringify(dialogObj)}});

}