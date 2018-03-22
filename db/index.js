const { Pool, Client } = require('pg');
const config = require('config');

const pool = new Pool({
  connectionString: config.db,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
