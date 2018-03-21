const db=require ('.');

async function all() {
  return db.query("SELECT * FROM bots");
}

async function get(botid) {
  return db.query("SELECT name, description, api_key FROM bots WHERE id=$1", [botid]);
}

module.exports = {
  all: () => all(),
  get: (botid) => get(botid)
}
