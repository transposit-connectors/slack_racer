({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  setImmediate(() => {
    const { channel_id, team_id, user_id } = body;
    const dialogJson = api.run("this.generate_dialog_json", {});  
    api.run("slack_bot.open_dialog", { $body: { trigger_id: body.trigger_id, dialog: dialogJson }});
  });
  return { status_code: 200 };
}