({ testView, result }) => {
  let blocks = testView.blocks;	
  let resultBlocks = [
    {
        "type": "divider"
    },
    {
        "type": "section",
        "block_id": "original",
        "text": {
            "type": "mrkdwn",
            "text": `${result}`
        }
    }
  ]
  
  blocks.push({
        "type": "divider"
    })
  
  blocks.push(    {
        "type": "section",
        "block_id": "original",
        "text": {
            "type": "mrkdwn",
            "text": `${result}`
        }
    })
  // blocks = blocks.concat(resultBlocks)
  	
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