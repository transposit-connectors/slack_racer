/*
 * Helper method to handle record keeping
 */

({ workspaceId, paragraphId, username, wpm }) => {
  let rec = api.run("airtable.get_records", {
    baseId: env.get("baseId"),
    table: "Workspaces",
    filterByFormula: `id="${workspaceId}"`
  })[0];

  // create record for this workspace if first time
  if (rec == null) {
    let fields = {};
    fields.id = workspaceId;
    fields[paragraphId] = JSON.stringify({ username, wpm });
    api.run("airtable.create_record", { baseId: env.get("baseId"), table: "Workspaces", $body: { fields } });
    return;
  }
  let blob = rec.fields[paragraphId];

  let meta = { username: "", wpm: -1 };
  if (blob != null) {
    meta = JSON.parse(rec.fields[paragraphId]);
  }

  let oldName = meta.username;
  if (meta.wpm < wpm) {
    meta.username = username;
    meta.wpm = wpm;

    let fields = {};
    fields[paragraphId] = JSON.stringify(meta);
    api.run("airtable.update_record", {
      baseId: env.get("baseId"),
      table: "Workspaces",
      recordId: rec.id,
      $body: { fields }
    });
    return { updated: true, oldName };
  }
  return { updated: false };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
