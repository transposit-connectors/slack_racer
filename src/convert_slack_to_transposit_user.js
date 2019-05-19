({userId}) => {
  var results = api.runForAllUsers("this.map_users");
  let found = results.map((r) => r[0]).filter((r) => r.slackId === userId);
  return found;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */