({title}) => {
  let blocks = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Loading ...*"
			},
            // "accessory": {
            //       "type": "image",
            //       "image_url": api.run("dog_ceo.get_random_dog")[0].message, //api takes too long, other call will try to update
            //       "alt_text": "henlo!"
            //   }
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