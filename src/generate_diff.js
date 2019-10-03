(params) => {
	return [
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
				"text": ">>>This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
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
				"text": ">>>This is a plain text section block."
			}
		}
	];
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */