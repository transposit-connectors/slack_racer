/*
 * Return response for /race_highscores command
 * Lists fastest records for each completed text in a workspace
 */

({ http_event }) => {
  // requires significant processing, delay execution of this code block
  setImmediate(() => {
    var _ = require("underscore.js");
    let body = http_event.parsed_body;
    let blocks = [];
    console.log(body);

    // get workspace record from airtable
    let rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      filterByFormula: `id="${body.team_id}"`
    })[0];

    // check if no runs
    if (rec == null) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `No high scores! Please finish a race first.`
        }
      });
    } else {
      // parse record and marshall data into blocks
      for (key in rec.fields) {
        if (parseInt(key)) {
          let blob = JSON.parse(rec.fields[key]);
          blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Text*: ${key}\t\t|\t\t*User*: ${blob.username}\t\t|\t\t*Wpm*: ${blob.wpm}`
            }
          });
          blocks.push({
            type: "divider"
          });
        }
      }
    }

    let view = {
      type: "modal",
      callback_id: "highscores",
      title: {
        type: "plain_text",
        text: `Workspace highscores`
      },
      close: {
        type: "plain_text",
        text: "Cancel"
      },
      blocks
    };

    return api.run("slack.views_open", { $body: { trigger_id: body.trigger_id, view } }, { asGroup: body.team_id });
  });

  // return 200 immediately to prevent Slack timeout
  return { status_code: 200 };
}