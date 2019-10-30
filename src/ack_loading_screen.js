({title}) => {
  let blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Loading ...*"
			},
            "accessory": {
                  "type": "image",
                  "image_url": "https://d33wubrfki0l68.cloudfront.net/19e6962f9c321e8d902fca41dba9b0635720cbce/cbbd0/img/iggy-building.png",
                  "alt_text": "boo!"
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