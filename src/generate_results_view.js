({ payload }) => {
    let view = payload.view;
  	let type = view.callback_id;
  	let metadata = JSON.parse(view.private_metadata);
  
  	// pull out submission (dependent on order of blocks; for speed)
    let input = view.state.values.input.input.value;
    let original = view.blocks[0].text.text;

    // calculate timings
    const old = metadata.ts / 1000;
    const newer = Date.now() / 1000;
    const wpm = Math.floor(original.split(" ").length / ((newer - old) / 60));

    // validate and determine result
    const userInput = input.trim();
    let result;

    // advanced anti-hack detection
    if (wpm > 250) {
      result = `*${wpm} wpm?* Something smells fishy :fish: :face_with_monocle:`;
    } else if (input === original) {
      // recordkeeping
      result = api.run("this.update_best_record", {
        workspaceId: payload.team.id,
        textId: metadata.textId,
        username: payload.user.name,
        wpm
      })[0].message;
    } else {
      result = `Sorry, input did not match! *${wpm} wpm*`;
      /* generate diff here */
    }
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  let blocks = view.blocks;	
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
        }
    }
  ]
  	
  let view = {
	type: "modal",
    callback_id: "results",
    title: view.title,
    "close": {
    "type": "plain_text",
    "text": "Cancel"
    },
    blocks: resultBlocks,
  };
  
  return api.run("slack.views_update", {$body: {view_id: view.id, view: resultView}}, {asGroup: payload.team.id})
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */