const db = require('.');

async function all() {
  let result = await db.query('SELECT * FROM bots');
  return result.row;
}

async function get(botid) {
  let result = await db.query(
    'SELECT id, description, api_key FROM bots WHERE name=$1',
    [botid]
  );
  return result.rows[0];
}

async function get_event(botid, eventid) {
  let result = await db.query(
    'SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2',
    [botid, eventid]
  );
  return result.rows[0];
}

module.exports = {
  all: () => all(),
  get: (botid) => get(botid),
  get_event: (botid, eventid) => get(botid, eventid),
};
