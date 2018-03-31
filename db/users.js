const db = require('.');

/**
 * @class Users
 */
class Users {
  /**
   * All users
   * @return {Promise<Array>} All users
   */
  all() {
    return db.queryMany('SELECT * FROM users');
  }

  /**
   * Get user from db
   * @param {number} userId
   * @return {Promise<Object>} User name, description, api_key
   */
  get(userId) {
    return db.queryOne(
      'SELECT name, description, api_key FROM bots WHERE id=$1',
      [userId]
    );
  }
}

module.exports = Users;
