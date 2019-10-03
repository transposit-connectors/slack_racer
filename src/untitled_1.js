(params) => {
  return  api.run('airtable.get_records', {baseId: env.get("baseId"), table: 'Workspaces', filterByFormula: "id=${params.workspaceId}"})
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */