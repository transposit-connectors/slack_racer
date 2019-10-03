({ http_event }) => {
  setImmediate(() => {
    var _ = require("underscore.js");
    let body = http_event.parsed_body;
    console.log(body)

    let rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      filterByFormula: `id="${body.team_id}"`
    })[0];
    let blocks = [];

    for (key in rec.fields) {
      if (parseInt(key)) {
        let blob = JSON.parse(rec.fields[key])
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Id*: ${rec.fields.id} | *User*: ${blob.username} | *Wpm*: ${blob.wpm}`,
            emoji: true
          }
        });
        blocks.push({
          type: "divider"
        });
      }
    }

    let post = {
      channel: body.channel_id,
      user: body.user_id,
      blocks: blocks
    };

    return api.run(
      "slack.post_chat_ephemeral",
      { $body: post },
      { asGroup: body.team_id }
    );
  });

  return { status_code: 200 };
}

