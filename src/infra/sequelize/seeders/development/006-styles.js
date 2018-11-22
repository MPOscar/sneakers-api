const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('styles', Faker('styles'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('styles', null, {})
  }
}
