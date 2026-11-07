const { Model } = require('objection');
const BaseModel = require('./base.model');

class LessonModel extends BaseModel {
  static get tableName() { return 'lessons'; }
  static get jsonSchema() {
    return { type: 'object', required: ['teacher_id', 'name'], properties: { id: { type: 'integer' }, teacher_id: { type: 'integer' }, name: { type: 'string', minLength: 1, maxLength: 255 } } };
  }
  static get relationMappings() {
    return {
      sections: {
        relation: Model.HasManyRelation,
        modelClass: require('./lesson-section.model'),
        join: { from: 'lessons.id', to: 'lesson_sections.lesson_id' },
      },
    };
  }
}
module.exports = LessonModel;
