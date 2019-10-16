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
  
  // create blocks for view payload
  const blocks: [
		{
			"type": "input",
            "label": {
				"type": "plain_text",
				"text": "Your Input"
			},
          	"hint": "copy the text below into this box",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
              	"action_id": "input"
				// min_length
			}

		},
        {
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "",
				"emoji": true
			}
		}
		// {
		// 	"type": "input",
		// 	"element": {
		// 		"type": "plain_text_input",
		// 		"multiline": true
		// 	},
		// 	"label": {
		// 		"type": "plain_text",
		// 		"text": "Text"
		// 	}
		// }
	]
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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