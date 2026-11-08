const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user.model');
const TariffModel = require('../../models/tariff.model');
const knex = require('../../../knexfile').getKnex();
const { badRequest, notFound, forbidden, conflict } = require('../../utils/errors');
const { roles } = require('../../utils/auth');

const publicUser = (user) => ({ id: user.id, email: user.email, type: user.type, tariff_id: user.tariff_id });

/** @class UserService */
class UserService {
  async findById(id) {
    const user = await UserModel.query().findById(id);
    if (!user) throw notFound('Пользователь не найден');
    return publicUser(user);
  }

  async list() {
    const users = await UserModel.query().select('id', 'email', 'type', 'tariff_id', 'created_at').orderBy('id');
    return users;
  }

  async create(data) {
    const email = normalizeEmail(data.email);
    const password = validatePassword(data.password);
    const type = Number(data.type);
    if (![1, 2, 3].includes(type)) throw badRequest('type должен быть 1 (учитель), 2 (ученик) или 3 (админ)');
    const tariffId = data.tariff_id == null && data.tariffId == null ? null : Number(data.tariff_id ?? data.tariffId);
    if (type !== roles.teacher && tariffId !== null) throw badRequest('Тариф можно назначить только учителю');
    if (tariffId !== null && (!Number.isInteger(tariffId) || tariffId < 1)) throw badRequest('tariff_id должен быть положительным целым числом');
    if (tariffId !== null && !(await TariffModel.query().findById(tariffId))) throw badRequest('Тариф не найден');
    const passwordHash = await bcrypt.hash(password, 12);
    try {
      const user = await UserModel.query().insert({ email, password_hash: passwordHash, type, tariff_id: tariffId });
      return publicUser(user);
    } catch (error) {
      if (error.code === '23505') throw conflict('Пользователь с таким email уже существует');
      throw error;
    }
  }

  async createStudentForTeacher({ teacherId, email: emailInput, password: passwordInput }) {
    const email = normalizeEmail(emailInput);
    const password = validatePassword(passwordInput);
    const passwordHash = await bcrypt.hash(password, 12);

    try {
      return await knex.transaction(async (trx) => {
        const teacher = await UserModel.query(trx).findById(teacherId).forUpdate();
        if (!teacher || teacher.type !== roles.teacher) throw forbidden();

        if (teacher.tariff_id) {
          const tariff = await TariffModel.query(trx).findById(teacher.tariff_id);
          const count = await trx('teacher_students').where({ teacher_id: teacher.id }).count('* as count').first();
          if (Number(count.count) >= tariff.student_count) throw conflict('Достигнут лимит учеников по тарифу');
        }

        const student = await UserModel.query(trx).insert({
          email,
          password_hash: passwordHash,
          type: roles.student,
          tariff_id: null,
        });
        await trx('teacher_students').insert({ teacher_id: teacher.id, student_id: student.id });
        return publicUser(student);
      });
    } catch (error) {
      if (error.code === '23505') throw conflict('Пользователь с таким email уже существует');
      throw error;
    }
  }

  async assignStudent({ actor, teacherId, studentId }) {
    if (actor.type !== roles.admin && (actor.type !== roles.teacher || actor.userId !== Number(teacherId))) throw forbidden();
    const [teacher, student] = await Promise.all([UserModel.query().findById(teacherId), UserModel.query().findById(studentId)]);
    if (!teacher || teacher.type !== roles.teacher) throw badRequest('Указанный пользователь не является учителем');
    if (!student || student.type !== roles.student) throw badRequest('Указанный пользователь не является учеником');
    await knex.transaction(async (trx) => {
      await UserModel.query(trx).findById(teacher.id).forUpdate();
      const existing = await trx('teacher_students').where({ teacher_id: teacher.id, student_id: student.id }).first();
      if (existing) return;
      if (teacher.tariff_id) {
        const tariff = await TariffModel.query(trx).findById(teacher.tariff_id);
        const count = await trx('teacher_students').where({ teacher_id: teacher.id }).count('* as count').first();
        if (Number(count.count) >= tariff.student_count) throw conflict('Достигнут лимит учеников по тарифу');
      }
      await trx('teacher_students').insert({ teacher_id: teacher.id, student_id: student.id });
    });
    return { teacher_id: teacher.id, student_id: student.id };
  }

  async removeStudent({ actor, teacherId, studentId }) {
    if (actor.type !== roles.admin && (actor.type !== roles.teacher || actor.userId !== Number(teacherId))) throw forbidden();
    const deleted = await knex('teacher_students').where({ teacher_id: teacherId, student_id: studentId }).delete();
    if (!deleted) throw notFound('Связь учителя и ученика не найдена');
    return { teacher_id: Number(teacherId), student_id: Number(studentId), deleted: true };
  }
}

function normalizeEmail(email) {
  if (typeof email !== 'string' || !email.trim() || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw badRequest('Укажите корректный email');
  }
  return email.trim().toLowerCase();
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 200) throw badRequest('Пароль должен содержать от 8 до 200 символов');
  return password;
}

exports.UserService = UserService;
exports.publicUser = publicUser;
exports.normalizeEmail = normalizeEmail;
exports.validatePassword = validatePassword;
