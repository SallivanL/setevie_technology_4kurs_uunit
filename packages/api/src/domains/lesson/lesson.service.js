const LessonModel = require('../../models/lesson.model');
const UserModel = require('../../models/user.model');
const knex = require('../../../knexfile').getKnex();
const { badRequest, forbidden, notFound } = require('../../utils/errors');
const { roles } = require('../../utils/auth');

class LessonService {
  async list(user) {
    const teacherIds = await this.accessibleTeacherIds(user);
    if (user.type === roles.admin) {
      return LessonModel.query().select('id', 'name').orderBy('id');
    }
    return LessonModel.query().select('id', 'name').whereIn('teacher_id', teacherIds).orderBy('id');
  }

  async get(user, lessonId) {
    const lesson = await LessonModel.query().findById(lessonId).withGraphFetched('sections.widgets');
    if (!lesson) throw notFound('Урок не найден');
    await this.assertReadable(user, lesson.teacher_id);
    return serializeLesson(lesson);
  }

  async create(user, data) {
    if (user.type !== roles.teacher && user.type !== roles.admin) throw forbidden();
    const teacherId = user.type === roles.admin && data.teacher_id ? Number(data.teacher_id) : user.userId;
    const teacher = await UserModel.query().findById(teacherId);
    if (!teacher || teacher.type !== roles.teacher) throw badRequest('Урок должен принадлежать учителю');
    const input = validateLesson(data);
    const lessonId = await knex.transaction(async (trx) => {
      const lesson = await LessonModel.query(trx).insert({ teacher_id: teacherId, name: input.name });
      await this.insertSections(trx, lesson.id, input.data);
      return lesson.id;
    });
    return this.get(user, lessonId);
  }

  async update(user, lessonId, data) {
    const lesson = await LessonModel.query().findById(lessonId);
    if (!lesson) throw notFound('Урок не найден');
    if (user.type !== roles.admin && (user.type !== roles.teacher || lesson.teacher_id !== user.userId)) throw forbidden();
    const input = validateLesson(data);
    await knex.transaction(async (trx) => {
      await LessonModel.query(trx).patch({ name: input.name, updated_at: trx.fn.now() }).where({ id: lesson.id });
      await trx('lesson_sections').where({ lesson_id: lesson.id }).delete();
      await this.insertSections(trx, lesson.id, input.data);
    });
    return this.get(user, lesson.id);
  }

  async remove(user, lessonId) {
    const lesson = await LessonModel.query().findById(lessonId);
    if (!lesson) throw notFound('Урок не найден');
    if (user.type !== roles.admin && (user.type !== roles.teacher || lesson.teacher_id !== user.userId)) throw forbidden();
    await LessonModel.query().deleteById(lessonId);
    return { id: Number(lessonId), deleted: true };
  }

  async accessibleTeacherIds(user) {
    if (user.type === roles.teacher) return [user.userId];
    if (user.type === roles.student) {
      const rows = await knex('teacher_students').select('teacher_id').where({ student_id: user.userId });
      return rows.map((row) => row.teacher_id);
    }
    return [];
  }

  async assertReadable(user, teacherId) {
    if (user.type === roles.admin) return;
    const allowed = await this.accessibleTeacherIds(user);
    if (!allowed.includes(Number(teacherId))) throw forbidden();
  }

  async insertSections(trx, lessonId, sections) {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
      const sectionInput = sections[sectionIndex];
      const [section] = await trx('lesson_sections').insert({
        lesson_id: lessonId,
        name: sectionInput.sectionName ?? sectionInput.name,
        position: sectionIndex,
      }).returning(['id']);
      const widgets = sectionInput.widgets.map((widget, position) => ({
        section_id: section.id,
        type: widget.type,
        name: widget.name,
        description: widget.description ?? null,
        position,
      }));
      if (widgets.length) await trx('lesson_widgets').insert(widgets);
    }
  }
}

function validateLesson(data) {
  if (!data || typeof data.name !== 'string' || !data.name.trim() || data.name.length > 255) throw badRequest('Урок должен содержать name');
  const sections = data.data ?? data.sections ?? [];
  if (!Array.isArray(sections)) throw badRequest('data должен быть массивом секций');
  for (const section of sections) {
    if (!section || typeof (section.sectionName ?? section.name) !== 'string' || !(section.sectionName ?? section.name).trim()) throw badRequest('Каждая секция должна содержать sectionName');
    if (!Array.isArray(section.widgets)) throw badRequest('Секция должна содержать массив widgets');
    for (const widget of section.widgets) {
      if (!widget || typeof widget.type !== 'string' || typeof widget.name !== 'string' || !widget.name.trim()) throw badRequest('Виджет должен содержать type и name');
      if (widget.description != null && typeof widget.description !== 'string') throw badRequest('description виджета должен быть строкой');
    }
  }
  return { name: data.name.trim(), data: sections };
}

function serializeLesson(lesson) {
  return {
    id: lesson.id,
    name: lesson.name,
    data: (lesson.sections || []).sort((a, b) => a.position - b.position).map((section) => ({
      id: section.id,
      sectionName: section.name,
      widgets: (section.widgets || []).sort((a, b) => a.position - b.position).map(({ id, type, name, description }) => ({ id, type, name, description })),
    })),
  };
}

exports.LessonService = LessonService;
