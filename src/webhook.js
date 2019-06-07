({ http_event }) => {
  let qs = require('qs.js');
  let body = qs.parse(http_event.body);
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
  };

  const trigger_id = body.trigger_id;
  return api.run("slack_bot.open_dialog", { $body: { trigger_id, dialog: JSON.stringify(dialogObj) }});
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