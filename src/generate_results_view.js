({ testView }) => {
  	console.log(testView);
  	let blocks = testView.blocks;	
  
  
	let resultBlocks = [
      // blocks
      {
          "type": "divider"
      },
      {
          "type": "section",
          "block_id": "original",
          "text": {
              "type": "mrkdwn",
              "text": `*Text*\n${text}`
          }
      }
    ]
    
    blocks.concat(resultBlocks) // or whateva
  
  
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */