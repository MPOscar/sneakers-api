const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('collections', Faker('collections'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('collections', null, {})
  }
}
