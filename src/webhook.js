({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  setImmediate(() => {
    const { channel_id, team_id, user_id } = body;
    let user = api.user({ type: "slack", workspaceId: team_id, userId: user_id });
    api.run("this.serve_text", {slackBody: body}, {asUser: user.id});
  });
  return { status_code: 200 };
}