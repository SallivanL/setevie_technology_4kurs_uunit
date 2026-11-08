const { Model } = require('objection');
const { BaseModel } = require('../shared/base.model');

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
    const { UserModel } = require('../user/user.model');

    return {
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: { from: 'words.teacher_id', to: 'users.id' },
      },
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: { from: 'words.student_id', to: 'users.id' },
      },
    };
  }
}
exports.WordModel = WordModel;
