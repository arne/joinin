const db = require('.');

 /*
  * @class Bots
  */
class Bots {
 /*
  * @return Promise
  */
 all() {
    return db.queryMany('SELECT * FROM bots');
  };
  /*
   * @param  {values}
   */
  create(values) {
    return db.queryOne(
      'INSERT INTO bots(name, api_key, owner_id, description) VALUES($1, $2, $3, $4) RETURNING id, name, api_key, owner_id, description',
      [values.name, values.api_key, values.owner_id, values.description]
    );
  };
  /*
   * @param  {} botId
   */
  get(botId) {
    return db.queryOne(
      'SELECT name, description, api_key FROM bots WHERE id=$1',
      [botId]
    );
  };
  /*
   * @param  {} botId
   * @param  {} eventId
   */
  getEvent(botId, eventId) {
    return db.queryOne(
      'SELECT title, start, end FROM events WHERE bot_id=$1 AND id=$2',
      [botId, eventId]
    );
  };
 /** V
  * @param  {} values
  */
};

module.exports = Bots;
