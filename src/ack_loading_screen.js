({title}) => {
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
      view: api.run("this.generate_results_view", {
        testView: view,
        input,
        result
      })[0]
    }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */