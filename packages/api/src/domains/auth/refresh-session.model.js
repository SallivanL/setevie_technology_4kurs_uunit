const { BaseModel } = require('../shared/base.model');

class RefreshSessionModel extends BaseModel {
  static get tableName() { return 'refresh_sessions'; }
}
exports.RefreshSessionModel = RefreshSessionModel;
