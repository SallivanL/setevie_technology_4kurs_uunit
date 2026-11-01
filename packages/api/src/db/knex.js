const path = require('node:path');
const dotenv = require('dotenv');
const knexFactory = require('knex');
const { Model } = require('objection');
const knexConfig = require('../../knexfile.cjs');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const knex = knexFactory(knexConfig[environment]);

Model.knex(knex);

module.exports = knex;
