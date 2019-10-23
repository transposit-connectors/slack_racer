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
      
    }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */