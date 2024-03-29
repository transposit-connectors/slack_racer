/*
 * Generate the dialog object to send to Slack
 */

({ stringify, textId }) => {
  let rec;

  // if no textId, get random record
  if (textId < 0) {
    const list = api.run("airtable.get_record", {
      baseId: env.get("baseId"),
      table: "Meta",
      recordId: env.get("recordId")
    })[0];
    const idx = Math.floor(Math.random() * list.fields.count);
    rec = api.run("airtable.get_record", {
      baseId: env.get("baseId"),
      table: "Texts",
      recordId: list.fields.texts[idx]
    })[0];
  } else {
    rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Texts",
      filterByFormula: `id=${textId}`
    })[0];
  }

  textId = rec.fields.id;
  let text = rec.fields.text;

  // create blocks for modal
  const blocks = [
    {
      type: "section",
      block_id: "original",
      text: {
        type: "mrkdwn",
        text: `${text}`
      }
    },
    {
      type: "divider"
    },
    {
      type: "input",
      block_id: "input",
      label: {
        type: "plain_text",
        text: "Your Input"
      },
      hint: {
        type: "plain_text",
        text: "Shift + Shift to get to input field quickly, and again to submit quickly"
      },
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "input"
      }
    }
  ];

  // record start time
  const private_metadata = JSON.stringify({
    ts: Date.now(),
    recordId: rec.id,
    textId: textId
  });

  let view = {
    type: "modal",
    callback_id: "test",
    title: {
      type: "plain_text",
      text: `SlackRacer: Text ${textId}`
    },
    close: {
      type: "plain_text",
      text: "Cancel"
    },
    submit: {
      type: "plain_text",
      text: "Submit"
    },
    private_metadata,
    blocks
  };

  return view;
}