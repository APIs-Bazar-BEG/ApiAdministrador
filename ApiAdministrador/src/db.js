const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('✅ Conexión a la base de datos establecida.');
    return pool;
  } catch (err) {
    console.error('❌ Error de conexión a la base de datos:', err);
    throw err;
  }
}

module.exports = {
  getConnection,
  sql
};
