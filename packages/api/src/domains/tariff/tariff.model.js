const { Model } = require('objection');
const { BaseModel } = require('../shared/base.model');

class TariffModel extends BaseModel {
  static get tableName() { return 'tariffs'; }
  static get jsonSchema() {
    return {
      type: 'object', required: ['name', 'student_count', 'cost'],
      properties: {
        id: { type: 'integer' }, name: { type: 'string', minLength: 1, maxLength: 120 },
        student_count: { type: 'integer', minimum: 1 }, cost: { type: 'number', minimum: 0 },
      },
    };
  }
  static get relationMappings() {
    const { UserModel } = require('../user/user.model');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: { from: 'tariffs.id', to: 'users.tariff_id' },
      },
    };
  }
}
exports.TariffModel = TariffModel;
