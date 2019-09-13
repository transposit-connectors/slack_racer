({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  // setImmediate(() => {
    const dialogJson = api.run("this.generate_dialog_json", {slackBody: body});  
    console.log(api.run("slack.open_dialog", { $body: { trigger_id: body.trigger_id, dialog: dialogJson, token: "xoxp-74039991971-566092669473-753647702529-7a98b1f15f91275033899b81b8af6811" }}, { "asGroup": body.channel_id }));
  // });
  return { status_code: 200 };
}