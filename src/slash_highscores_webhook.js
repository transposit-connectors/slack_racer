({ http_event }) => {
  // console.log(http_event)
  setImmediate(() => {
    var _ = require("underscore.js");
    let body = http_event.parsed_body;
    // console.log(body)

    let rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      filterByFormula: `id="${body.team_id}"`
    })[0];
    let blocks = [];
    console.log(rec);
    console.log(rec.fields);
    for (field in rec.fields) {
      if (parseInt(field)) {
        blocks.push({
          type: "section",
          text: {
            type: "plain_text",
            text: "This is a plain text section block.",
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
      { asGroup: payload.team.id }
    );
  });

  return { status_code: 200 };
};

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
