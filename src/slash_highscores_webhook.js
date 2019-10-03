({ http_event }) => {
  console.log(http_event)
  let body = http_event.parsed_body;
  console.log(body)
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: { "greeting": "Hello World" }
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */