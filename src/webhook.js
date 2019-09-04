({ http_event }) => {
  console.log(http_event);
  let body = http_event.parsed_body;
  setImmediate(() => {
    const {cha} = body;
    let user = api.user({type: "slack", workspaceId:})
    if (user) {
      api.runForAllUsers("this.serve_text", {slackBody: body}, {"users": [user.transpositId]});
    } else {
      api.run("this.not_found", {slackUserId: userId, slackChannelId: channelId});
    }
  });
  return { status_code: 200 };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/building/webhooks
 */