const db = require('.');

function all() {
 return db.query('SELECT * FROM bots');
}

function get(bot_id) {
  return db.queryOne(
    'SELECT name, description, api_key FROM bots WHERE id=$1',
    [bot_id]
  );
}

function get_event(botid, eventid) {
  return db.queryOne(
    'SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2',
    [botid, eventid]
  );
}

module.exports = {
  all: () => all(),
  get: (bot) => get(bot),
  get_event: (botid, eventid) => get(botid, eventid),
};
