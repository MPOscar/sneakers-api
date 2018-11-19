const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', Faker('brands'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {})
  }
}
