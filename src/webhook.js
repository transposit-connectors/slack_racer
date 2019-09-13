({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  setImmediate(() => {
    const dialogJson = api.run("this.generate_dialog_json", {slackBody: body});  
    api.run("slack.open_dialog", { $body: { trigger_id: body.trigger_id, dialog: dialogJson }});
  });
  return { status_code: 200 };
}