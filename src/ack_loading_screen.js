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
  
  return {status_code: 200}
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