/*
 * Return response for /race_help command
 */

({ http_event }) => {
  return {
    status_code: 200,
    headers: { "Content-Type": "application/json" },
    body: { "text": "Please e-mail puya@transposit.com with any help inquiries or feedback!" }
  };
}