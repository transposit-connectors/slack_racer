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
          "style": "primary",
            "text": {
                "type": "plain_text",
                "text": "Retry"
            },
            "value": "retry"
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