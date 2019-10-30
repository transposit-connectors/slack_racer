({payload}) => {
  let view = payload.view;
  let type = view.callback_id;
  let metadata = JSON.parse(view.private_metadata);
  
  const viewJson = api.run("this.generate_test_view")[0]; 
  return api.run("slack.views_open", { $body: { trigger_id: payload.trigger_id, view: viewJson }}, { asGroup: body.team_id });
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */