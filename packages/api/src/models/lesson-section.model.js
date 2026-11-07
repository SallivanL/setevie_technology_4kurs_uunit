const { Model } = require('objection');
const BaseModel = require('./base.model');

class LessonSectionModel extends BaseModel {
  static get tableName() { return 'lesson_sections'; }
  static get jsonSchema() {
    return { type: 'object', required: ['lesson_id', 'name'], properties: { id: { type: 'integer' }, lesson_id: { type: 'integer' }, name: { type: 'string', minLength: 1, maxLength: 255 }, position: { type: 'integer', minimum: 0 } } };
  }
  static get relationMappings() {
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./lesson.model'),
        join: { from: 'lesson_sections.lesson_id', to: 'lessons.id' },
      },
      widgets: {
        relation: Model.HasManyRelation,
        modelClass: require('./lesson-widget.model'),
        join: { from: 'lesson_sections.id', to: 'lesson_widgets.section_id' },
      },
    };
  }
}
module.exports = LessonSectionModel;
