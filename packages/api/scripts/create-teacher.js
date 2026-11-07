const knex = require('../knexfile').getKnex();
const { UserService } = require('../src/domains/user/user.service');

async function main() {
  const tariffId = process.env.TEACHER_TARIFF_ID ? Number(process.env.TEACHER_TARIFF_ID) : null;
  const userService = new UserService();
  const teacher = await userService.create({
    email: 't@yandex.ru',
    password: '123123123',
    type: 1,
    tariff_id: tariffId,
  });

  console.log(`Учитель создан: ${teacher.email} (id: ${teacher.id})`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => knex.destroy());
