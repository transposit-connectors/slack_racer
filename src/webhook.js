({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  setImmediate(() => {
    const { channel_id, team_id, user_id } = body;
    let user = api.user({ type: "slack", workspaceId: team_id, userId: user_id });
    console.log(user);
    if (user) {
      api.run("this.serve_text", {body: body}, {asUser: user.id});
    } else {
      api.run("this.not_found", {slackUserId: user_id, slackChannelId: channel_id});
    }
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/building/webhooks
 */