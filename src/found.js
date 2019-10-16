/*
 * Generate the dialog object to send to Slack
 */

({ stringify }) => {  
  // fetch paragraph text from Airtable
  const list = api.run('airtable.get_record', {baseId: env.get("baseId"), table: 'Meta', recordId: env.get("recordId")})[0];
  const idx = Math.floor(Math.random()*list.fields.count);
  let rec = api.run('airtable.get_record', {baseId: env.get("baseId"), table: 'Texts', recordId: list.fields.texts[idx]})[0];
  let text = rec.fields.text;
  let textId = rec.fields.id;
  
  // create elements for dialog box
  const elements = [{
    type: "textarea",
    name: "input",
    label: "Your input",
    hint: "Write the below text into this box",
    //min_length: text.length,
  }, {
    type: "textarea",
    name: "original",
    label: "Copy this",
    value: text,
    //min_length: text.length
  }];
  
  // record start time
  const private_metadata = JSON.stringify({
    ts: Date.now(),
    recordId: rec.id,
    textId: textId
  })
    
  let view = {
	type: "modal",
    callback_id: "race",
    title: 
    {
      type: "plain_text",
      text: `SlackRacer: Text ${textId}`
    },
    "close": {
    "type": "plain_text",
    "text": "Cancel"
    },
    "submit": {
      "type": "plain_text",
      "text": "Save"
    },
    blocks
  };

  if (stringify) {
    view.private_metadata = JSON.stringify(private_metadata);
    return JSON.stringify(view);
  }
  
  view.private_metadata = private_metadata;
  return view;
}