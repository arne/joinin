const { Pool } = require('pg');
const config = require('config');

const pool = new Pool({
  connectionString: config.db,
});

/**
 * Add two numbers.
 * @param {text} text SQL query
 * @param {array} params The parameters
 * @return {promise} Promise to node-pg res
 */
function queryOne(text, params) {
  return pool.query(text, params).then((res) => {
    return res.rows ? res.rows[0] : null;
  });
}
function queryMany(text, params) {
  return pool.query(text, params).then((res) => {
    return res.rows;
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  queryOne: (text, params) => queryOne(text, params),
  queryMany: (text, params) => queryMany(text, params),
};
