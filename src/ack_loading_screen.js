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
    callback_id: "results",
    title: {
      type: "plain_text",
      text: title,
    },
    "close": {
    "type": "plain_text",
    "text": "Cancel"
    },
  }
  
  return {
    status_code: 200,
    body: {
      response_action: "update",
      view: view,
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */