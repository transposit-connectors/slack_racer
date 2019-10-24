({ testView, input, result }) => {
  let blocks = testView.blocks;	
  let resultBlocks = [
    {
        "type": "section",
        "block_id": "input",
        "text": {
            "type": "mrkdwn",
            "text": `*Your Input*\n${}`
        }
    },
    {
        "type": "divider"
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

  blocks = blocks.concat(resultBlocks)
  	
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
    blocks
  };
  
  return view;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */