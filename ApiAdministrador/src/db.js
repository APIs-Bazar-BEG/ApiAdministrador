const sql = require('mssql');

const config = {
  user: 'EmelyNj',
  password: 'Mely123#',
  server: 'localhost',
  database: 'bazarBEG_Administrador',
  port: 53158,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conexión exitosa a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos:', err);
    throw err;
  });

module.exports = { sql, poolPromise };
