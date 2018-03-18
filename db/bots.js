const db=require ('.');

async function all() {
  return db.query("SELECT * FROM bots");
}

module.exports = {
  all: () => all()
}
