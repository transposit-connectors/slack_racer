({payload}) => {
  let view = payload.view;
  let type = view.callback_id;
  let metadata = JSON.parse(view.private_metadata);
  
  const viewJson = api.run("this.generate_test_view", {textId: metadata.textId})[0]; 
  return api.run("slack.views_update", { $body: { view_id: view.id, view: viewJson }}, { asGroup: payload.team.id });
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */