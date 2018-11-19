const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', Faker('categories'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {})
  }
}
