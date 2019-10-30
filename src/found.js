/*
 * Generate the dialog object to send to Slack
 */

({ stringify, textId }) => {
  let rec;
  if (textId < 0) {
    const list = api.run("airtable.get_record", {
      baseId: env.get("baseId"),
      table: "Meta",
      recordId: env.get("recordId")
    })[0];
    const idx = Math.floor(Math.random() * list.fields.count);
    let recordId = list.fields.texts[idx];
    
    rec = api.run("airtable.get_record", {
      baseId: env.get("baseId"),
      table: "Texts",
      recordId: recordId
  	})[0];
  } else {
    rec = api.run("airtable.get_records", {
      baseId: env.get("baseId"),
      table: "Texts",
      filterByFormula: `id=${textId}`
    })[0];
  }
  
  let text = rec.fields.text;
  textId = rec.fields.id;

  // create blocks for modal
  const blocks = [
    {
      type: "section",
      block_id: "original",
      text: {
        type: "mrkdwn",
        text: `\n${text}`
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
        text: "Copy the text into this box"
      },
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "input"
        // min_length
      }
    }
  ];

  // record start time
  const private_metadata = {
    ts: Date.now(),
    recordId: rec.id,
    textId: textId
  };

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
      text: "Save"
    },
    blocks
  };

  if (stringify) {
    view.private_metadata = JSON.stringify(private_metadata);
    return view;
  }

  view.private_metadata = private_metadata;
  return view;
}