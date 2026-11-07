const WordModel = require('../../models/word.model');
const UserModel = require('../../models/user.model');
const knex = require('../../../knexfile').getKnex();
const { badRequest, forbidden, notFound } = require('../../utils/errors');
const { roles } = require('../../utils/auth');

class WordsService {
  async listTeachers(user) {
    if (user.type === roles.teacher) {
      return UserModel.query().select('id', 'email').where({ id: user.userId, type: roles.teacher });
    }
    if (user.type === roles.admin) {
      return UserModel.query().select('id', 'email').where({ type: roles.teacher }).orderBy('id');
    }
    const assignments = await knex('teacher_students').select('teacher_id').where({ student_id: user.userId });
    const teacherIds = assignments.map((row) => row.teacher_id);
    if (teacherIds.length === 0) return [];
    return UserModel.query().select('id', 'email').whereIn('id', teacherIds).orderBy('id');
  }

  async listStudents(user) {
    if (user.type === roles.teacher) {
      const assignments = await knex('teacher_students').select('student_id').where({ teacher_id: user.userId });
      const studentIds = assignments.map((row) => row.student_id);
      if (studentIds.length === 0) return [];
      return UserModel.query().select('id', 'email').whereIn('id', studentIds).orderBy('id');
    }
    if (user.type === roles.admin) {
      return UserModel.query().select('id', 'email').where({ type: roles.student }).orderBy('id');
    }
    return [];
  }

  async list(user) {
    const selection = ['id', 'teacher_id', 'student_id', 'english', 'russian'];
    if (user.type === roles.teacher) return WordModel.query().select(selection).where({ teacher_id: user.userId }).orderBy('id');
    if (user.type === roles.admin) return WordModel.query().select(selection).orderBy('id');
    const teacherRows = await knex('teacher_students').select('teacher_id').where({ student_id: user.userId });
    const teacherIds = teacherRows.map((row) => row.teacher_id);
    if (teacherIds.length === 0) return [];
    return WordModel.query()
      .select(selection)
      .whereIn('teacher_id', teacherIds)
      .where((query) => query.whereNull('student_id').orWhere('student_id', user.userId))
      .orderBy('id');
  }

  async create(user, data) {
    if (![roles.teacher, roles.student, roles.admin].includes(user.type)) throw forbidden();
    let teacherId;
    let studentId = null;

    if (user.type === roles.teacher) {
      teacherId = user.userId;
      studentId = optionalId(data.student_id, 'student_id');
    } else if (user.type === roles.admin) {
      teacherId = optionalId(data.teacher_id, 'teacher_id');
      studentId = optionalId(data.student_id, 'student_id');
    } else {
      teacherId = await this.resolveStudentTeacher(user.userId, data.teacher_id);
      studentId = user.userId;
      if (data.student_id != null && Number(data.student_id) !== user.userId) throw forbidden();
    }

    if (!Number.isInteger(teacherId) || teacherId < 1) throw badRequest('Укажите teacher_id');
    const teacher = await UserModel.query().findById(teacherId);
    if (!teacher || teacher.type !== roles.teacher) throw badRequest('Указанный пользователь не является учителем');
    if (studentId !== null) await this.assertStudentAssigned(teacherId, studentId);
    const { english, russian } = validateWord(data);
    const word = await WordModel.query().insert({ teacher_id: teacherId, student_id: studentId, english, russian });
    return serializeWord(word);
  }

  async update(user, id, data) {
    const word = await WordModel.query().findById(id);
    if (!word) throw notFound('Слово не найдено');
    this.assertCanManage(user, word);
    const { english, russian } = validateWord(data);
    const patch = { english, russian, updated_at: knex.fn.now() };
    if (Object.hasOwn(data, 'student_id')) {
      if (user.type === roles.student) throw forbidden();
      const studentId = optionalId(data.student_id, 'student_id');
      if (studentId !== null) await this.assertStudentAssigned(word.teacher_id, studentId);
      patch.student_id = studentId;
    }
    const updated = await WordModel.query().patchAndFetchById(id, patch);
    return serializeWord(updated);
  }

  async remove(user, id) {
    const word = await WordModel.query().findById(id);
    if (!word) throw notFound('Слово не найдено');
    this.assertCanManage(user, word);
    await WordModel.query().deleteById(id);
    return { id: Number(id), deleted: true };
  }

  assertCanManage(user, word) {
    if (user.type === roles.admin) return;
    if (user.type === roles.teacher && word.teacher_id === user.userId) return;
    if (user.type === roles.student && word.student_id === user.userId) return;
    throw forbidden();
  }

  async resolveStudentTeacher(studentId, requestedTeacherId) {
    const assignments = await knex('teacher_students').select('teacher_id').where({ student_id: studentId });
    if (requestedTeacherId != null) {
      const teacherId = optionalId(requestedTeacherId, 'teacher_id');
      if (!assignments.some((row) => row.teacher_id === teacherId)) throw forbidden('Этот учитель не связан с учеником');
      return teacherId;
    }
    if (assignments.length !== 1) {
      throw badRequest('Укажите teacher_id: у ученика должно быть ровно одно назначение или нужно выбрать учителя');
    }
    return assignments[0].teacher_id;
  }

  async assertStudentAssigned(teacherId, studentId) {
    const student = await UserModel.query().findById(studentId);
    if (!student || student.type !== roles.student) throw badRequest('Указанный пользователь не является учеником');
    const assignment = await knex('teacher_students').where({ teacher_id: teacherId, student_id: studentId }).first();
    if (!assignment) throw badRequest('Ученик не назначен этому учителю');
  }
}

function optionalId(value, fieldName) {
  if (value == null) return null;
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw badRequest(`${fieldName} должен быть положительным целым числом`);
  return id;
}

function serializeWord(word) {
  return {
    id: word.id,
    teacher_id: word.teacher_id,
    student_id: word.student_id,
    english: word.english,
    russian: word.russian,
  };
}

function validateWord(data) {
  const english = typeof data.english === 'string' ? data.english.trim() : '';
  const russian = typeof data.russian === 'string' ? data.russian.trim() : '';
  if (!english || english.length > 255 || !russian || russian.length > 255) throw badRequest('Слово должно содержать english и russian');
  return { english, russian };
}

exports.WordsService = WordsService;
