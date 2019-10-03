({input, original, wpm}) => {
	return [
        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `Sorry, your input was incorrect! *Wpm:* ${wpm}`
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Input"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `>>>${input}`
			}
            
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Prompt (Text #15)"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `>>>${original}`
			}
		}
	];
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */