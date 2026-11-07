const BaseModel = require('./base.model');

class RefreshSessionModel extends BaseModel {
  static get tableName() { return 'refresh_sessions'; }
}
module.exports = RefreshSessionModel;
