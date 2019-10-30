({title}) => {
  let blocks = [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Loading ..."
			}
		}
	]
  
  let view = {
    type: "modal",
    callback_id: "loading",
    title: {
      type: "plain_text",
      text: title,
    },
    "close": {
    	"type": "plain_text",
    	"text": "Cancel"
    },
    blocks
  }
  
  view = {
	type: "modal",
    callback_id: "loading",
	title: {
		type: "plain_text",
		text: "My App"
    },
	"close": {
		"type": "plain_text",
		"text": "Cancel"
    },
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "This is a plain text section block.",
				"emoji": true
			}
		}
	]
}
  return {
    status_code: 200,
    body: {
      response_action: "update",
      view: view,
    }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */