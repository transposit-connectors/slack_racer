/*
 * Helper method to handle record keeping and generate success messages
 */

({ workspaceId, textId, username, wpm }) => {
  // get workspace record for the text
  let rec = api.run("airtable.get_records", {
    baseId: env.get("baseId"),
    table: "Workspaces",
    filterByFormula: `id="${workspaceId}"`
  })[0];

  // create main record for this workspace if first time
  if (rec == null) {
    let fields = {};
    fields.id = workspaceId;
    fields[textId] = JSON.stringify({ username, wpm });
    api.run("airtable.create_record", { baseId: env.get("baseId"), table: "Workspaces", $body: { fields } });
    return { updated: true, message: `Congratulations! You now hold the record for text *#${textId}* with a speed of *${wpm} wpm*! :crown: :tada:` };
  }

  // get text's record and parse json
  let blob = rec.fields[textId];
  let meta = { username: "", wpm: -1 };
  if (blob != null) {
    meta = JSON.parse(rec.fields[textId]);
  }

  // update accordingly
  let oldName = meta.username;
  if (meta.wpm < wpm) {
    meta.username = username;
    meta.wpm = wpm;

    let fields = {};
    fields[textId] = JSON.stringify(meta);
    api.run("airtable.update_record", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      recordId: rec.id,
      $body: { fields }
    });

    var message;
    if (oldName === "") {
      message = `Congratulations! You now hold the record for text *#${textId}* with a speed of *${wpm} wpm*! :crown: :tada:`;
    } else {
      message = `:crown: Congratulations, you beat *${oldName}* and now hold the record for text *#${textId}* with a speed of *${wpm} wpm*!`;
    }
    return { updated: true, message };
  }
  return { updated: false, message: `Nice job! *${wpm} wpm*` };
}