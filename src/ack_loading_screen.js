/*
 * Loading screen to acknowledges incoming Slack responses
 */

({title}) => {
  let blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Loading ...*"
			}
		}
	]
  
  let view = {
    type: "modal",
    callback_id: "loading",
    title,
    "close": {
    	"type": "plain_text",
    	"text": "Cancel"
    },
    blocks
  }
  
  return {
    status_code: 200,
    body: {
      response_action: "update",
      view: view,
    }
  };
}