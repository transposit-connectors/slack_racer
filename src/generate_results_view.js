({ testView, input, result }) => {
  let blocks = testView.blocks;	
  let resultBlocks = [
    blocks[0],
    blocks[1],
    {
        "type": "section",
        "block_id": "input",
        "text": {
            "type": "mrkdwn",
            "text": `*Your Input*\n${input}`
        }
    },
    {
        "type": "divider"
    },
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*Results*\n${result}`
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Retry"
				},
				"value": "retry"
			}
		},
    {
        "type": "section",
        "block_id": "result",
        "text": {
            "type": "mrkdwn",
            "text": `*Results*\n${result}`
        }
    }
  ]
  	
  let view = {
	type: "modal",
    callback_id: "results",
    title: testView.title,
    "close": {
    "type": "plain_text",
    "text": "Cancel"
    },
    "submit": {
      "type": "plain_text",
      "text": "Retry"
    },
    blocks: resultBlocks,
  };
  
  return view;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */