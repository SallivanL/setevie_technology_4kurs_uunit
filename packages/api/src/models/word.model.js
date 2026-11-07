const { Model } = require('objection');
const BaseModel = require('./base.model');

class WordModel extends BaseModel {
  static get tableName() { return 'words'; }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['teacher_id', 'english', 'russian'],
      properties: {
        id: { type: 'integer' },
        teacher_id: { type: 'integer' },
        student_id: { type: ['integer', 'null'] },
        english: { type: 'string', minLength: 1, maxLength: 255 },
        russian: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./user.model'),
        join: { from: 'words.teacher_id', to: 'users.id' },
      },
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./user.model'),
        join: { from: 'words.student_id', to: 'users.id' },
      },
    };
  }
}
module.exports = WordModel;
