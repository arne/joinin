const db = require('.');

const users = {
  all: function() {
    return db.queryMany('SELECT * FROM users');
  },
  get: function(user_id) {
    return db.queryOne(
      'SELECT name, description, api_key FROM bots WHERE id=$1',
      [user_id]
    );
  },
};

module.exports = users;
