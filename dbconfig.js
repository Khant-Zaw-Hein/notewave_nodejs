require('dotenv').config(); // Load environment variables from .env

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustedconnection: process.env.DB_TRUSTED_CONNECTION === 'true',
    enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
    instancename: process.env.DB_INSTANCE_NAME,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  },
  port: parseInt(process.env.DB_PORT)
};
module.exports = config; 


