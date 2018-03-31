const {Pool} = require('pg');
const config = require('config');

const pool = new Pool({
  connectionString: config.db,
});

/**
 * Wrap query and return one row
 * @param {string} text SQL query
 * @param {array} params The parameters
 * @return {Promise<Object>} Promise to node-pg res
 */
function queryOne(text, params) {
  return pool.query(text, params).then((res) => {
    return res.rows ? res.rows[0] : null;
  });
}

/**
 * Wrap query and return many rows
 * @param {string} text SQL query
 * @param {Array} params The parameters
 * @return {Promise<Array>} Promise to node-pg res
 */
function queryMany(text, params) {
  return pool.query(text, params).then((res) => {
    return res.rows;
  });
}

module.exports = {
  query: pool.query,
  queryOne: queryOne,
  queryMany: queryMany,
};
