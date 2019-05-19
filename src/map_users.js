(params) => {
  let slackId = user_setting.get('slack_id');
  if (slackId) {
    console.log(`Found ${slackId}`);
    return {
      transpositId: api.user().email,
      slackId: slackId
    };
  } else {
    let slackUser = api.run('slack_identify.get_users_identity')[0];
    if (slackUser.user) {
    user_setting.put('slack_id', slackUser.user.id);
      return {
        transpositId: api.user().email,
        slackId: slackUser.user.id
      };
    } else {
      return {};
    }
  }
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */