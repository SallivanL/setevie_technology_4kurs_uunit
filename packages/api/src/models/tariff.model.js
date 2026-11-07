const { Model } = require('objection');
const BaseModel = require('./base.model');

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
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: require('./user.model'),
        join: { from: 'tariffs.id', to: 'users.tariff_id' },
      },
    };
  }
}
module.exports = TariffModel;
