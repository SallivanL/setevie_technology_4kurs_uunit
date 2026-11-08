const { Model } = require('objection');
const { BaseModel } = require('../shared/base.model');

class LessonModel extends BaseModel {
  static get tableName() { return 'lessons'; }
  static get jsonSchema() {
    return { type: 'object', required: ['teacher_id', 'name'], properties: { id: { type: 'integer' }, teacher_id: { type: 'integer' }, name: { type: 'string', minLength: 1, maxLength: 255 } } };
  }
  static get relationMappings() {
    const { LessonSectionModel } = require('./lesson-section.model');

    return {
      sections: {
        relation: Model.HasManyRelation,
        modelClass: LessonSectionModel,
        join: { from: 'lessons.id', to: 'lesson_sections.lesson_id' },
      },
    };
  }
}
exports.LessonModel = LessonModel;
