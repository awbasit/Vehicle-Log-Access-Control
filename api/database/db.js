const { Pool } = require("pg");

// These are the credentials for the database access
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vehiclelogs",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
