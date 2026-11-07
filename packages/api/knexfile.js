const path = require('node:path');
const dotenv = require('dotenv');
const knexFactory = require('knex');
const { Model } = require('objection');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connection = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'uunit',
  user: process.env.DB_USER || 'uunit',
  password: process.env.DB_PASSWORD || 'uunit_local_password',
};

const config = {
  development: {
    client: 'pg',
    connection,
    pool: { min: 0, max: 10 },
    migrations: { directory: path.resolve(__dirname, 'migrations') },
  },
  production: {
    client: 'pg',
    connection,
    pool: { min: 0, max: 10 },
    migrations: { directory: path.resolve(__dirname, 'migrations') },
  },
};

let knexInstance;
Object.defineProperty(config, 'getKnex', {
  enumerable: false,
  value() {
    if (!knexInstance) {
      const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
      knexInstance = knexFactory(config[environment]);
      Model.knex(knexInstance);
    }
    return knexInstance;
  },
});

module.exports = config;
