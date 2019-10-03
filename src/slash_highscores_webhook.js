({ http_event }) => {
  setImmediate(() => {
    var _ = require("underscore.js");
    let body = http_event.parsed_body;
    console.log(body);

    let rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      filterByFormula: `id="${body.team_id}"`
    })[0];

    if (rec == null) {
      return api.run(
        "slack.post_chat_ephemeral",
        {
          $body: {
            channel: body.channel_id,
            user: body.user_id,
            text: "No high scores! Please finish a race first."
          }
        },
        { asGroup: body.team_id }
      );
    }

    let blocks = [];

    for (key in rec.fields) {
      if (parseInt(key)) {
        let blob = JSON.parse(rec.fields[key]);
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Id*: ${key} | *User*: ${blob.username} | *Wpm*: ${blob.wpm}`
          }
        });
        blocks.push({
          type: "divider"
        });
      }
    }

    if (blocks.length === 0) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "No high scores! Please finish a race first."
        }
      });
    }

    let post = {
      channel: body.channel_id,
      user: body.user_id,
      blocks: blocks
    };

    return api.run("slack.post_chat_ephemeral", { $body: post }, { asGroup: body.team_id });
  });

  return { status_code: 200 };
}
