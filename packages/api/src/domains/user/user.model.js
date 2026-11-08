const { Model } = require('objection');
const { BaseModel } = require('../shared/base.model');

class UserModel extends BaseModel {
  static get tableName() { return 'users'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password_hash', 'type'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', maxLength: 320 },
        password_hash: { type: 'string', maxLength: 255 },
        type: { type: 'integer', enum: [1, 2, 3] },
        tariff_id: { type: ['integer', 'null'] },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const { TariffModel } = require('../tariff/tariff.model');
    const { LessonModel } = require('../lesson/lesson.model');
    const { WordModel } = require('../words/word.model');
    const { RefreshSessionModel } = require('../auth/refresh-session.model');

    return {
      tariff: {
        relation: Model.BelongsToOneRelation,
        modelClass: TariffModel,
        join: { from: 'users.tariff_id', to: 'tariffs.id' },
      },
      lessons: {
        relation: Model.HasManyRelation,
        modelClass: LessonModel,
        join: { from: 'users.id', to: 'lessons.teacher_id' },
      },
      words: {
        relation: Model.HasManyRelation,
        modelClass: WordModel,
        join: { from: 'users.id', to: 'words.teacher_id' },
      },
      studentWords: {
        relation: Model.HasManyRelation,
        modelClass: WordModel,
        join: { from: 'users.id', to: 'words.student_id' },
      },
      refreshSessions: {
        relation: Model.HasManyRelation,
        modelClass: RefreshSessionModel,
        join: { from: 'users.id', to: 'refresh_sessions.user_id' },
      },
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: 'users.id',
          through: { from: 'teacher_students.teacher_id', to: 'teacher_students.student_id' },
          to: 'users.id',
        },
      },
      teachers: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: 'users.id',
          through: { from: 'teacher_students.student_id', to: 'teacher_students.teacher_id' },
          to: 'users.id',
        },
      },
    };
  }
}

exports.UserModel = UserModel;
