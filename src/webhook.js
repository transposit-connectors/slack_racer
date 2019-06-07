({ http_event }) => {
  let body = http_event.parsed_body;
  console.log(body);
  return;
  setImmediate(() => {
    let channelId = body.channel_id;
    let userId = body.user_id;
    let user = api.run('this.convert_slack_to_transposit_user', {userId})[0];
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