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
  blocks.concat(resultBlocks)
  	
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
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */