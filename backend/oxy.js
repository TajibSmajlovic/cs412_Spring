let bookshelf = require('./db')
class OxY extends bookshelf.model.Model {
  get tableName () {
    return 'OxY'
  }
  static all () {
    return this.forge().fetchAll()
  }
  static byName(name) {
    return this.forge().query({where:{ 'Name': name }}).fetchAll()
  }
}
module.exports = OxY
