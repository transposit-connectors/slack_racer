// ({ http_event }) => {
//   let qs = require('qs.js');
//   let body = JSON.parse(qs.parse(http_event).body);
//   console.log(body.challenge);
//   return {
//     status_code: 200,
//     headers: { "Content-Type": "application/json" },
//     body: { "challenge": body.challenge, "greeting": "Hello World" }
//   };
// }

// /*
//  * For sample code and reference material, visit
//  * https://www.transposit.com/docs/building/webhooks
//  */

({ http_event }) => {
  let qs = require('qs.js');
  let body = qs.parse(http_event.body);
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