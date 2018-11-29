const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('offers', Faker('offers'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('offers', null, {})
  }
}
