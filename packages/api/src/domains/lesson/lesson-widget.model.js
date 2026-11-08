const { BaseModel } = require('../shared/base.model');

class LessonWidgetModel extends BaseModel {
  static get tableName() { return 'lesson_widgets'; }
  static get jsonSchema() {
    return { type: 'object', required: ['section_id', 'type', 'name'], properties: { id: { type: 'integer' }, section_id: { type: 'integer' }, type: { type: 'string', minLength: 1, maxLength: 80 }, name: { type: 'string', minLength: 1, maxLength: 255 }, description: { type: ['string', 'null'] }, position: { type: 'integer', minimum: 0 } } };
  }
}
exports.LessonWidgetModel = LessonWidgetModel;
