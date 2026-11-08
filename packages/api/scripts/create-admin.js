const path = require('node:path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const knex = require('../knexfile').getKnex();
const { UserModel } = require('../src/domains/user/user.model');
const { normalizeEmail, validatePassword } = require('../src/domains/user/user.service');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function main() {
  const email = normalizeEmail('a@yandex.ru');
  const password = validatePassword('123123123');
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await UserModel.query().findOne({ email });
  if (existing) {
    await UserModel.query().patch({ password_hash: passwordHash, type: 3, tariff_id: null }).where({ id: existing.id });
    console.log(`Admin account updated: ${email}`);
  } else {
    await UserModel.query().insert({ email, password_hash: passwordHash, type: 3 });
    console.log(`Admin account created: ${email}`);
  }
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => knex.destroy());
