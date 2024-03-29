/*
 * Return response for /race command
 */

({ http_event }) => {
  let body = http_event.parsed_body;
  setImmediate(() => {
    let textId = parseInt(body.text);
    const viewJson = api.run("this.generate_test_view", { textId: textId || -1 })[0];
    api.run("slack.views_open", { $body: { trigger_id: body.trigger_id, view: viewJson } }, { asGroup: body.team_id });
  });
  return { status_code: 200 };
}