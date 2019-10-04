/*
 * On incorrect submits, returns input and prompt for user to look at if they want
 */

({ input, original, wpm }) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Sorry, your input was incorrect! *Wpm: ${wpm}*`
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
    },
    {
      "type": "divider"
    }
  ];
}
