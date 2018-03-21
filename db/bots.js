const db=require ('.');

async function all() {
  return db.query("SELECT * FROM bots");
}

async function get(botid) {
  return db.query("SELECT name, description, api_key FROM bots WHERE id=$1", [botid]);
}

async function get_event(botid, eventid) {
  return db.query("SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2", [botid, eventid]);
}

module.exports = {
  all: () => all(),
  get: (botid) => get(botid)
  get_event: (botid, eventid) => get(botid, eventid)
}
