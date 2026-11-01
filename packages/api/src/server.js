const path = require('node:path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const knex = require('./db/knex');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/health/live', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/health/ready', async (_request, response) => {
  try {
    await knex.raw('select 1');
    response.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    response.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

let server;

async function start() {
  try {
    await knex.raw('select 1');
    server = app.listen(port, '0.0.0.0', () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Could not connect to PostgreSQL:', error.message);
    await knex.destroy();
    process.exitCode = 1;
  }
}

async function shutdown(signal) {
  console.log(`${signal} received, shutting down API`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await knex.destroy();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
