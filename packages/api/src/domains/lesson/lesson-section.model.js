const { Model } = require('objection');
const { BaseModel } = require('../shared/base.model');

class LessonSectionModel extends BaseModel {
  static get tableName() { return 'lesson_sections'; }
  static get jsonSchema() {
    return { type: 'object', required: ['lesson_id', 'name'], properties: { id: { type: 'integer' }, lesson_id: { type: 'integer' }, name: { type: 'string', minLength: 1, maxLength: 255 }, position: { type: 'integer', minimum: 0 } } };
  }
  static get relationMappings() {
    const { LessonModel } = require('./lesson.model');
    const { LessonWidgetModel } = require('./lesson-widget.model');

    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: LessonModel,
        join: { from: 'lesson_sections.lesson_id', to: 'lessons.id' },
      },
      widgets: {
        relation: Model.HasManyRelation,
        modelClass: LessonWidgetModel,
        join: { from: 'lesson_sections.id', to: 'lesson_widgets.section_id' },
      },
    };
  }
}
exports.LessonSectionModel = LessonSectionModel;
