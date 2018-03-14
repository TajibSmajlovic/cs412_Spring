let bookshelf = require('./db')
class User extends bookshelf.model.Model {
  get tableName () {
    return 'User'
  }
  static all () {
    return this.forge().fetchAll()
  }
  static byName(name) {
<<<<<<< HEAD
    return this.forge().query({where:{ 'User.name': name }}).fetchAll()
=======
    return this.forge().query({where:{ 'name': name }}).fetchAll()
>>>>>>> 1f2e8c1fe9ab27bf8af553d1fbecc6c77c127613
  }
}
module.exports = User
