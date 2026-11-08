const knex = require('../knexfile').getKnex();
const { UserService } = require('../src/domains/user/user.service');
const { UserModel } = require('../src/domains/user/user.model');

async function main() {
  const userService = new UserService();
  const student = await userService.create({
    email: 's@yandex.ru',
    password: '123123123',
    type: 2,
  });

  if (process.env.TEACHER_ID) {
    try {
      await userService.assignStudent({
        actor: { userId: 0, type: 3 },
        teacherId: process.env.TEACHER_ID,
        studentId: student.id,
      });
    } catch (error) {
      await UserModel.query().deleteById(student.id);
      throw error;
    }
  }

  console.log(`Ученик создан: ${student.email} (id: ${student.id})`);
  if (process.env.TEACHER_ID) console.log(`Назначен учителю id: ${process.env.TEACHER_ID}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => knex.destroy());
